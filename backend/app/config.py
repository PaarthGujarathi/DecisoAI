import os
from pathlib import Path

from dotenv import load_dotenv

from pathlib import Path
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError(
        "Missing required environment variable: GEMINI_API_KEY. "
        "Please set it in your .env file or environment."
    )

__all__ = ["GEMINI_API_KEY"]