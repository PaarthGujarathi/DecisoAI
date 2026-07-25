def build_decision_prompt(
    question: str,
    context: str | None,
    constraints: list[str],
) -> str:
    """Build a structured prompt for strategic business decision analysis."""

    context_block = f"Context:\n{context}\n\n" if context else ""

    constraints_block = (
        "\n".join(f"- {constraint}" for constraint in constraints)
        if constraints
        else "- None"
    )

    return f"""
You are an expert strategic business consultant.

Analyze the user's decision objectively and provide practical business advice.

Decision Question:
{question}

{context_block}Constraints:
{constraints_block}

If important information is missing, make reasonable assumptions and briefly mention them in the recommendation instead of inventing facts.

Return ONLY valid JSON.

Do NOT include:
- Markdown
- Code fences
- Extra explanations
- Any text before or after the JSON

Use this exact schema:

{{
  "recommendation": "string",
  "confidence": 0,
  "pros": [
    "string"
  ],
  "cons": [
    "string"
  ],
  "risks": [
    "string"
  ]
}}

Rules:
- confidence must be an integer from 0 to 100
- recommendation should be concise (2-4 sentences)
- include 3-5 pros
- include 3-5 cons
- include 3-5 risks
- keep every list item short and actionable
"""