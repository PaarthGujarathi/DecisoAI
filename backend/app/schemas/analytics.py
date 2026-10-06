from pydantic import BaseModel


class AnalyticsResponse(BaseModel):
    total_revenue: float
    total_cost: float
    total_profit: float
    profit_margin: float
    top_product: str | None
    top_region: str | None