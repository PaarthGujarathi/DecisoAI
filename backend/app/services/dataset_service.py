import pandas as pd


class DatasetService:
    
    def profile_dataset(self, df: pd.DataFrame) -> dict:

        """
    Generate metadata for an uploaded dataset.

    Returns:
        - row count
        - column count
        - numeric columns
        - categorical columns
        - missing values
    """

        numeric_columns = df.select_dtypes(include="number").columns.tolist()

        categorical_columns = df.select_dtypes(
            exclude="number"
        ).columns.tolist()

        missing_values = (
            df.isnull()
            .sum()
            .to_dict()
        )

        return {
            "rows": len(df),
            "columns": len(df.columns),
            "column_names": df.columns.tolist(),
            "numeric_columns": numeric_columns,
            "categorical_columns": categorical_columns,
            "missing_values": missing_values,

            "quality": self._calculate_quality(df),
        }

    def _calculate_quality(self, df: pd.DataFrame) -> dict:

        return {
            "duplicate_rows": int(df.duplicated().sum()),
            "missing_cells": int(df.isnull().sum().sum()),
            "completeness": round(
                (1 - df.isnull().sum().sum() / df.size) * 100,
                2,
            ),
        }



dataset_service = DatasetService()