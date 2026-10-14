
import pandas as pd
from fastapi import HTTPException, UploadFile
from app.services.dataset_store import dataset_store

from app.services.dataset_service import dataset_service


class UploadService:
    def process_csv(self, file: UploadFile) -> dict:
        try:
            df = pd.read_csv(file.file)
            print("Uploaded filename:", file.filename)
            print("Uploaded dataframe shape:", df.shape)
            print("Uploaded columns:", df.columns.tolist())
        except Exception as exc:
            raise HTTPException(
                status_code=400,
                detail="Invalid CSV file.",
            ) from exc

        if df.empty:
            raise HTTPException(
                status_code=400,
                detail="Uploaded dataset is empty.",
            )
        dataset_id = dataset_store.save(df)
        profile = dataset_service.profile_dataset(df)

        return {
            "dataset_id": dataset_id,
            "filename": file.filename,
            "preview": df.head(10).to_dict(orient="records"),
            **profile,
        }


upload_service = UploadService()
