from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.decision import router as decision_router
from app.api.upload import router as upload_router
from app.api.analytics import router as analytics_router
from app.api.simulation import router as simulation_router
from app.api.ml import router as ml_router



app = FastAPI(
    title="DecisioAI API",
    description="AI-Powered Business Decision Intelligence Platform",
    version="0.1.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(decision_router)
app.include_router(upload_router)
app.include_router(analytics_router)
app.include_router(simulation_router)
app.include_router(ml_router)