from uuid import uuid4

import pandas as pd


class DatasetStore:
    """Temporary in-memory storage for complete uploaded datasets."""

    def __init__(self) -> None:
        self._datasets: dict[str, pd.DataFrame] = {}

    def save(self, df: pd.DataFrame) -> str:
        dataset_id = str(uuid4())

        # Store the complete DataFrame, not the preview.
        self._datasets[dataset_id] = df.copy()

        print(
            f"Saved dataset {dataset_id}: "
            f"{len(self._datasets[dataset_id])} rows"
        )

        return dataset_id

    def get(self, dataset_id: str) -> pd.DataFrame | None:
        df = self._datasets.get(dataset_id)

        if df is not None:
            print(f"Retrieved dataset {dataset_id}: {len(df)} rows")
        else:
            print(f"Dataset not found in memory: {dataset_id}")

        return df

    def delete(self, dataset_id: str) -> bool:
        return self._datasets.pop(dataset_id, None) is not None


dataset_store = DatasetStore()
