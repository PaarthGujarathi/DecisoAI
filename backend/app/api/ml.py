from fastapi import APIRouter

from app.schemas.ml import (
    DemandPredictionRequest,
    DemandPredictionResponse,
    DecisionSimulationRequest,
    DecisionSimulationResponse,
    WhatIfRequest,
    WhatIfResponse,
)

from app.services.ml_service import ml_service


router = APIRouter(
    prefix="/ml",
    tags=["Machine Learning"],
)


@router.post(
    "/predict-demand",
    response_model=DemandPredictionResponse,
)
def predict_demand(
    request: DemandPredictionRequest,
):
    predicted_quantity = ml_service.predict_quantity(
        product=request.product,
        category=request.category,
        cost=request.cost,
        price=request.price,
        region=request.region,
        month=request.month,
    )

    return {
        "predicted_quantity": predicted_quantity
    }


@router.post(
    "/simulate-decision",
    response_model=DecisionSimulationResponse,
)
def simulate_decision(
    request: DecisionSimulationRequest,
):
    predicted_quantity = ml_service.predict_quantity(
        product=request.product,
        category=request.category,
        cost=request.cost,
        price=request.price,
        region=request.region,
        month=request.month,
    )

    predicted_revenue = request.price * predicted_quantity
    predicted_cost = request.cost * predicted_quantity
    predicted_profit = predicted_revenue - predicted_cost

    profit_margin = (
        (predicted_profit / predicted_revenue) * 100
        if predicted_revenue > 0
        else 0
    )

    return {
        "product": request.product,
        "predicted_quantity": round(predicted_quantity, 2),
        "predicted_revenue": round(predicted_revenue, 2),
        "predicted_cost": round(predicted_cost, 2),
        "predicted_profit": round(predicted_profit, 2),
        "profit_margin": round(profit_margin, 2),
    }

@router.post(
    "/what-if",
    response_model=WhatIfResponse,
)
def what_if_decision(
    request: WhatIfRequest,
):
    current_quantity = ml_service.predict_quantity(
        product=request.product,
        category=request.category,
        cost=request.current_cost,
        price=request.current_price,
        region=request.region,
        month=request.month,
    )

    proposed_quantity = ml_service.predict_quantity(
        product=request.product,
        category=request.category,
        cost=request.proposed_cost,
        price=request.proposed_price,
        region=request.region,
        month=request.month,
    )

    current_revenue = request.current_price * current_quantity
    proposed_revenue = request.proposed_price * proposed_quantity

    current_profit = (
        request.current_price - request.current_cost
    ) * current_quantity

    proposed_profit = (
        request.proposed_price - request.proposed_cost
    ) * proposed_quantity

    revenue_change = proposed_revenue - current_revenue
    profit_change = proposed_profit - current_profit

    profit_change_percent = (
        (profit_change / current_profit) * 100
        if current_profit != 0
        else 0
    )

    if profit_change > 0:
        recommendation = "RECOMMENDED"
        reason = (
            f"The proposed decision is expected to increase "
            f"profit by {profit_change_percent:.2f}%."
        )
    elif profit_change < 0:
        recommendation = "NOT RECOMMENDED"
        reason = (
            f"The proposed decision is expected to decrease "
            f"profit by {abs(profit_change_percent):.2f}%."
        )
    else:
        recommendation = "NEUTRAL"
        reason = (
            "The proposed decision is expected to have "
            "no impact on profit."
        )

    return {
        "product": request.product,
        "current_quantity": round(current_quantity, 2),
        "proposed_quantity": round(proposed_quantity, 2),
        "current_revenue": round(current_revenue, 2),
        "proposed_revenue": round(proposed_revenue, 2),
        "current_profit": round(current_profit, 2),
        "proposed_profit": round(proposed_profit, 2),
        "revenue_change": round(revenue_change, 2),
        "profit_change": round(profit_change, 2),
        "profit_change_percent": round(profit_change_percent, 2),
        "recommendation": recommendation,
        "reason": reason,
    }

