from fastapi import APIRouter

from app.schemas.decision import DecisionRequest, DecisionResponse
from app.services.decision_service import DecisionService

router = APIRouter(prefix="/decision", tags=["Decision"])
service = DecisionService()


@router.post("/analyze", response_model=DecisionResponse)
def analyze_decision(request: DecisionRequest) -> DecisionResponse:
    return service.analyze(request)