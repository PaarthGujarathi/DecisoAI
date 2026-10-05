from pydantic import BaseModel


class SimulationRequest(BaseModel):
    product: str
    quantity_change_percent: float


class SimulationResponse(BaseModel):
    product: str
    quantity_change_percent: float

    current_quantity: float
    projected_quantity: float

    current_revenue: float
    projected_revenue: float

    current_profit: float
    projected_profit: float

    revenue_change: float
    profit_change: float
    profit_change_percent: float