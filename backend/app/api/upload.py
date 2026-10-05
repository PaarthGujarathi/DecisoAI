from fastapi import APIRouter, UploadFile, File

from app.schemas.upload import UploadResponse
from app.services.upload_service import upload_service

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post("/dataset", response_model=UploadResponse)
async def upload_dataset(file: UploadFile = File(...)):
    return upload_service.process_csv(file)