from fastapi import FastAPI

app = FastAPI(
    title="DecisioAI API",
    description="AI-Powered Business Decision Intelligence Platform",
    version="0.1.0"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to DecisioAI 🚀",
        "status": "Backend is running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }