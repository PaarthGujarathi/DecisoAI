export interface DecisionRequest {
  question: string;
  context: string;
  constraints: string[];
}

export interface DecisionResponse {
  recommendation: string;
  confidence: number;
  pros: string[];
  cons: string[];
  risks: string[];
}

const API_URL = "http://127.0.0.1:8000/decision/analyze";

export async function analyzeDecision(
  data: DecisionRequest
): Promise<DecisionResponse> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze decision.");
  }

  return response.json();
}