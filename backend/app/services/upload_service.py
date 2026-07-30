import pandas as pd
from fastapi import UploadFile, HTTPException
from app.services.dataset_service import dataset_service


class UploadService:

    def process_csv(self, file: UploadFile) -> dict:

        try:
            df = pd.read_csv(file.file)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Invalid CSV file."
            )

        if df.empty:
            raise HTTPException(
                status_code=400,
                detail="Uploaded dataset is empty."
            )

        profile = dataset_service.profile_dataset(df)

        return {
            "filename": file.filename,
            "preview": df.head(10).to_dict(orient="records"),
            **profile,
        }
from fastapi import UploadFile

def process_csv(self, file: UploadFile) -> dict:

        df = pd.read_csv(file.file)

        profile = dataset_service.profile_dataset(df)

        return {
            "filename": file.filename,
            "preview": df.head(10).to_dict(orient="records"),
            **profile,
        }


upload_service = UploadService()