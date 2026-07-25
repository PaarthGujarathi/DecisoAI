from fastapi import FastAPI

from app.api.health import router as health_router
from app.api.decision import router as decision_router

app = FastAPI(
    title="DecisioAI API",
    description="AI-Powered Business Decision Intelligence Platform",
    version="0.1.0",
)

app.include_router(health_router)
app.include_router(decision_router)