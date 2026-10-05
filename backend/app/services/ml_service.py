from pathlib import Path

import joblib
import pandas as pd


class MLService:

    def __init__(self):
        project_root = Path(__file__).resolve().parents[3]

        model_path = (
            project_root
            / "ml"
            / "models"
            / "demand_model.joblib"
        )

        self.model = joblib.load(model_path)

    def predict_quantity(
        self,
        product: str,
        category: str,
        cost: float,
        price: float,
        region: str,
        month: str,
    ) -> float:

        month_date = pd.to_datetime(month)

        input_data = pd.DataFrame(
            [
                {
                    "Product": product,
                    "Category": category,
                    "Cost": cost,
                    "Price": price,
                    "Region": region,
                    "Year": month_date.year,
                    "MonthNumber": month_date.month,
                }
            ]
        )

        prediction = self.model.predict(input_data)[0]

        return round(float(prediction), 2)


ml_service = MLService()