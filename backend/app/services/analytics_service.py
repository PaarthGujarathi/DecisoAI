import pandas as pd


class AnalyticsService:

    def calculate_metrics(self, df: pd.DataFrame) -> dict:

        # Revenue = Price × Quantity
        revenue = df["Price"] * df["Quantity"]

        # Cost = Cost × Quantity
        cost = df["Cost"] * df["Quantity"]

        # Profit = Revenue - Cost
        profit = revenue - cost

        total_revenue = revenue.sum()
        total_cost = cost.sum()
        total_profit = profit.sum()

        # Profit margin
        profit_margin = (
            (total_profit / total_revenue) * 100
            if total_revenue > 0
            else 0
        )

        # Product performance
        product_profit = (
            df.assign(Profit=profit)
            .groupby("Product")["Profit"]
            .sum()
            .sort_values(ascending=False)
        )

        top_product = (
            product_profit.index[0]
            if not product_profit.empty
            else None
        )

        # Regional performance
        region_revenue = (
            df.assign(Revenue=revenue)
            .groupby("Region")["Revenue"]
            .sum()
            .sort_values(ascending=False)
        )

        top_region = (
            region_revenue.index[0]
            if not region_revenue.empty
            else None
        )

        return {
            "total_revenue": round(float(total_revenue), 2),
            "total_cost": round(float(total_cost), 2),
            "total_profit": round(float(total_profit), 2),
            "profit_margin": round(float(profit_margin), 2),
            "top_product": top_product,
            "top_region": top_region,
        }


analytics_service = AnalyticsService()