from pydantic import BaseModel, Field
from typing import List, Optional


class DecisionRequest(BaseModel):
    question: str = Field(
        ...,
        description="The primary business or personal decision to analyze."
    )

    context: Optional[str] = Field(
        default=None,
        description="Additional background information."
    )

    constraints: List[str] = Field(
        default_factory=list,
        description="Constraints or requirements for the decision."
    )


class DecisionResponse(BaseModel):
    recommendation: str

    confidence: float

    pros: List[str]

    cons: List[str]

    risks: List[str]