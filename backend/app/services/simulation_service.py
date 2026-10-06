import pandas as pd


class SimulationService:

    def simulate_quantity_change(
        self,
        df: pd.DataFrame,
        product: str,
        quantity_change_percent: float,
    ) -> dict:

        # Find the selected product
        product_df = df[df["Product"] == product].copy()

        if product_df.empty:
            raise ValueError(f"Product '{product}' not found.")

        # Current values
        current_quantity = product_df["Quantity"].sum()

        current_revenue = (
            product_df["Price"] * product_df["Quantity"]
        ).sum()

        current_cost = (
            product_df["Cost"] * product_df["Quantity"]
        ).sum()

        current_profit = current_revenue - current_cost

        # Apply what-if quantity change
        multiplier = 1 + (quantity_change_percent / 100)

        projected_quantity = current_quantity * multiplier

        projected_revenue = (
            product_df["Price"] * product_df["Quantity"] * multiplier
        ).sum()

        projected_cost = (
            product_df["Cost"] * product_df["Quantity"] * multiplier
        ).sum()

        projected_profit = projected_revenue - projected_cost

        # Differences
        revenue_change = projected_revenue - current_revenue
        profit_change = projected_profit - current_profit

        profit_change_percent = (
            (profit_change / current_profit) * 100
            if current_profit != 0
            else 0
        )

        return {
            "product": product,
            "quantity_change_percent": quantity_change_percent,

            "current_quantity": round(float(current_quantity), 2),
            "projected_quantity": round(float(projected_quantity), 2),

            "current_revenue": round(float(current_revenue), 2),
            "projected_revenue": round(float(projected_revenue), 2),

            "current_profit": round(float(current_profit), 2),
            "projected_profit": round(float(projected_profit), 2),

            "revenue_change": round(float(revenue_change), 2),
            "profit_change": round(float(profit_change), 2),

            "profit_change_percent": round(
                float(profit_change_percent),
                2,
            ),
        }


simulation_service = SimulationService()