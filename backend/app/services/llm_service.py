from google.genai import types
from google import genai

from app.config import GEMINI_API_KEY


class LLMService:
    """Reusable service for generating text with the Google Gemini API."""

    def __init__(self) -> None:
        self._client = genai.Client(api_key=GEMINI_API_KEY)
        self._model = "gemini-3.6-flash"

    def generate(self, prompt: str) -> str:
        """Send a prompt to Gemini and return the generated text."""
        try:
            response = self._client.models.generate_content(
                model=self._model,
                contents=prompt,
                config=types.GenerateContentConfig(temperature=0.2),
            )
            return response.text.strip()
        except Exception as exc:  # pragma: no cover - defensive logging
            raise RuntimeError(f"Failed to generate text from Gemini: {exc}") from exc
