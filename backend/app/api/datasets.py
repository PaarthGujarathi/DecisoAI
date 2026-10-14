from itertools import product

import pandas as pd
from fastapi import APIRouter, HTTPException, Query

from app.schemas.dataset import (
    DatasetOptionsResponse,
    ProductDetailsResponse,
)
from app.services.dataset_store import dataset_store

router = APIRouter(prefix="/datasets", tags=["Datasets"])


@router.get("/{dataset_id}/options", response_model=DatasetOptionsResponse)
def get_dataset_options(dataset_id: str):
    df = dataset_store.get(dataset_id)

    if df is None:
        raise HTTPException(status_code=404, detail="Dataset not found.")

    required = {"Product", "Category", "Region", "Cost", "Price", "Quantity", "Month"}
    missing = required - set(df.columns)

    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Dataset is missing required columns: {sorted(missing)}",
        )

    return {
        "dataset_id": dataset_id,
        "products": sorted(df["Product"].dropna().astype(str).unique().tolist()),
        "categories": sorted(df["Category"].dropna().astype(str).unique().tolist()),
        "regions": sorted(df["Region"].dropna().astype(str).unique().tolist()),
    }



@router.get(
    "/{dataset_id}/product-details",
    response_model=ProductDetailsResponse,
)
def get_product_details(
    dataset_id: str,
    product: str = Query(...),
    region: str = Query(...),
):
    df = dataset_store.get(dataset_id)

    if df is None:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found. Upload the CSV again.",
        )

    # Diagnostic output: inspect the dataset stored in memory
    print("Dataset shape:", df.shape)
    print("Dataset columns:", df.columns.tolist())
    print("First 10 products:", df["Product"].astype(str).unique()[:10])
    print("First 10 regions:", df["Region"].astype(str).unique()[:10])

    print(
        "Laptop rows in stored dataset:",
        (
            df["Product"]
            .astype(str)
            .str.strip()
            .str.casefold() == "laptop"
        ).sum(),
    )

    print(
        "West rows in stored dataset:",
        (
            df["Region"]
            .astype(str)
            .str.strip()
            .str.casefold() == "west"
        ).sum(),
    )

    required = {
        "Product",
        "Category",
        "Region",
        "Cost",
        "Price",
        "Quantity",
        "Month",
    }

    missing = required - set(df.columns)

    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Dataset is missing required columns: {sorted(missing)}",
        )

    # Normalize values to avoid case and whitespace mismatches
    product_values = (
        df["Product"].astype("string").str.strip().str.casefold()
    )

    region_values = (
        df["Region"].astype("string").str.strip().str.casefold()
    )

    rows = df[
        (product_values == product.strip().casefold())
        & (region_values == region.strip().casefold())
    ]

    print("Requested product:", repr(product))
    print("Requested region:", repr(region))
    print("Matching rows:", len(rows))

    if rows.empty:
        raise HTTPException(
            status_code=404,
            detail="No records found for the selected product and region.",
        )

    # Select the latest record for the chosen product and region
    latest = rows.copy()
    latest["_month"] = pd.to_datetime(
        latest["Month"],
        errors="coerce",
    )
    latest = latest.sort_values("_month", na_position="first")
    record = latest.iloc[-1]

    return {
        "dataset_id": dataset_id,
        "product": str(record["Product"]).strip(),
        "category": str(record["Category"]).strip(),
        "region": str(record["Region"]).strip(),
        "current_cost": float(record["Cost"]),
        "current_price": float(record["Price"]),
        "quantity": float(record["Quantity"]),
        "month": str(record["Month"])[:7],
    }
