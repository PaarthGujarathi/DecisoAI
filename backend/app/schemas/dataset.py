
from pydantic import BaseModel


class DatasetOptionsResponse(BaseModel):
    dataset_id: str
    products: list[str]
    categories: list[str]
    regions: list[str]


class ProductDetailsResponse(BaseModel):
    dataset_id: str
    product: str
    category: str
    region: str
    current_cost: float
    current_price: float
    quantity: float
    month: str
