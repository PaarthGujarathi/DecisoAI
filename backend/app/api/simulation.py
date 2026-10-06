from fastapi import APIRouter, HTTPException, UploadFile, File, Form
import pandas as pd

from app.services.simulation_service import simulation_service
from app.schemas.simulation import SimulationResponse


router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"],
)


@router.post(
    "/what-if",
    response_model=SimulationResponse,
)
async def simulate_what_if(
    product: str = Form(...),
    quantity_change_percent: float = Form(...),
    file: UploadFile = File(...),
):
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported.",
        )

    try:
        df = pd.read_csv(file.file)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read CSV file.",
        )

    required_columns = {
        "Product",
        "Cost",
        "Price",
        "Quantity",
    }

    missing_columns = required_columns - set(df.columns)

    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required columns: {sorted(missing_columns)}",
        )

    try:
        result = simulation_service.simulate_quantity_change(
            df=df,
            product=product,
            quantity_change_percent=quantity_change_percent,
        )

        return result

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Simulation failed: {str(e)}",
        )