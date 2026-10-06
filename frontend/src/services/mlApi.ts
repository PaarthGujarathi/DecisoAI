const API_URL = "http://127.0.0.1:8000";

export interface DemandPredictionRequest {
  product: string;
  category: string;
  cost: number;
  price: number;
  region: string;
  month: string;
}

export interface DemandPredictionResponse {
  predicted_quantity: number;
}

export interface DecisionSimulationResponse {
  product: string;
  predicted_quantity: number;
  predicted_revenue: number;
  predicted_cost: number;
  predicted_profit: number;
  profit_margin: number;
}

export interface WhatIfRequest {
  product: string;
  category: string;
  current_cost: number;
  current_price: number;
  proposed_cost: number;
  proposed_price: number;
  region: string;
  month: string;
}

export interface WhatIfResponse {
  product: string;
  current_quantity: number;
  proposed_quantity: number;
  current_revenue: number;
  proposed_revenue: number;
  current_profit: number;
  proposed_profit: number;
  revenue_change: number;
  profit_change: number;
  profit_change_percent: number;
  recommendation: string;
  reason: string;
}

async function post<T>(endpoint: string, data: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`ML request failed: ${response.status}`);
  }

  return response.json();
}

export function predictDemand(
  data: DemandPredictionRequest
): Promise<DemandPredictionResponse> {
  return post("/ml/predict-demand", data);
}

export function simulateDecision(
  data: DemandPredictionRequest
): Promise<DecisionSimulationResponse> {
  return post("/ml/simulate-decision", data);
}

export function simulateWhatIf(
  data: WhatIfRequest
): Promise<WhatIfResponse> {
  return post("/ml/what-if", data);
}