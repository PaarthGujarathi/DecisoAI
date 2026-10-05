from pydantic import BaseModel
from typing import Any


class UploadResponse(BaseModel):
    filename: str

    rows: int
    columns: int

    column_names: list[str]

    numeric_columns: list[str]

    categorical_columns: list[str]

    missing_values: dict[str, int]

    quality: dict[str, float | int]

    preview: list[dict[str, Any]]