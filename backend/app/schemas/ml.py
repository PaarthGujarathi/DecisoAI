from pydantic import BaseModel


class DemandPredictionRequest(BaseModel):
    product: str
    category: str
    cost: float
    price: float
    region: str
    month: str


class DemandPredictionResponse(BaseModel):
    predicted_quantity: float


class DecisionSimulationRequest(BaseModel):
    product: str
    category: str
    cost: float
    price: float
    region: str
    month: str


class DecisionSimulationResponse(BaseModel):
    product: str
    predicted_quantity: float
    predicted_revenue: float
    predicted_cost: float
    predicted_profit: float
    profit_margin: float


class WhatIfRequest(BaseModel):
    product: str
    category: str

    current_cost: float
    current_price: float

    proposed_cost: float
    proposed_price: float

    region: str
    month: str


class WhatIfResponse(BaseModel):
    product: str

    current_quantity: float
    proposed_quantity: float

    current_revenue: float
    proposed_revenue: float

    current_profit: float
    proposed_profit: float

    revenue_change: float
    profit_change: float
    profit_change_percent: float

    recommendation: str
    reason: str