import json

from app.prompts.decision_prompt import build_decision_prompt
from app.schemas.decision import DecisionRequest, DecisionResponse
from app.services.llm_service import LLMService


class DecisionService:
    """Orchestrates decision analysis by composing prompts and invoking the LLM service."""

    def __init__(self) -> None:
        self._llm_service = LLMService()

    def analyze(self, request: DecisionRequest) -> DecisionResponse:
        prompt = build_decision_prompt(
            question=request.question,
            context=request.context,
            constraints=request.constraints,
        )

        try:
            response_text = self._llm_service.generate(prompt)

            # Convert Gemini JSON response into a Python dictionary
            response_data = json.loads(response_text)

            # Validate and return using Pydantic
            return DecisionResponse(**response_data)

        except Exception as exc:
            # Fallback response if Gemini fails or returns invalid JSON
            return DecisionResponse(
                recommendation="Unable to analyze the decision at this time.",
                confidence=0,
                pros=[],
                cons=["AI service unavailable or returned an invalid response."],
                risks=[str(exc)],
            )