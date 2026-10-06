from fastapi import APIRouter, HTTPException, UploadFile, File
import pandas as pd

from app.services.analytics_service import analytics_service
from app.schemas.analytics import AnalyticsResponse


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.post(
    "/analyze",
    response_model=AnalyticsResponse,
)
async def analyze_dataset(
    file: UploadFile = File(...)
):
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported."
        )

    try:
        df = pd.read_csv(file.file)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read CSV file."
        )

    required_columns = {
        "Product",
        "Cost",
        "Price",
        "Quantity",
        "Region",
    }

    missing_columns = required_columns - set(df.columns)

    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required columns: {sorted(missing_columns)}"
        )

    try:
        result = analytics_service.calculate_metrics(df)
        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analytics calculation failed: {str(e)}"
        )