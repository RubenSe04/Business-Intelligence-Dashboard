from datetime import date, timedelta
import pandas as pd

from app.models import db
from app.models.sales import SalesTransaction


def parse_date(value):
    if not value:
        return None
    try:
        return date.fromisoformat(value)
    except ValueError:
        return None


def base_query(args):
    query = SalesTransaction.query
    start = parse_date(args.get("start_date"))
    end = parse_date(args.get("end_date"))
    region = args.get("region")
    category = args.get("category")
    product = args.get("product")
    status = args.get("status")

    if start:
        query = query.filter(SalesTransaction.order_date >= start)
    if end:
        query = query.filter(SalesTransaction.order_date <= end)
    if region:
        query = query.filter(SalesTransaction.region == region)
    if category:
        query = query.filter(SalesTransaction.category == category)
    if product:
        query = query.filter(SalesTransaction.product_name == product)
    if status:
        query = query.filter(SalesTransaction.order_status == status)
    elif not status:
        query = query.filter(SalesTransaction.order_status == "Completed")
    return query


def to_frame(rows):
    records = []
    for row in rows:
        records.append({
            "id": row.id,
            "order_id": row.order_id,
            "order_date": row.order_date,
            "customer_id": row.customer_id,
            "customer_name": row.customer_name,
            "product_id": row.product_id,
            "product_name": row.product_name,
            "category": row.category,
            "region": row.region,
            "city": row.city,
            "quantity": row.quantity,
            "unit_price": float(row.unit_price),
            "discount_percentage": float(row.discount_percentage),
            "unit_cost": float(row.unit_cost),
            "shipping_cost": float(row.shipping_cost),
            "payment_method": row.payment_method,
            "order_status": row.order_status,
        })
    frame = pd.DataFrame(records)
    if frame.empty:
        return frame
    frame["gross_sales"] = frame["quantity"] * frame["unit_price"]
    frame["revenue"] = frame["gross_sales"] * (1 - frame["discount_percentage"] / 100)
    frame["cogs"] = frame["quantity"] * frame["unit_cost"]
    frame["profit"] = frame["revenue"] - frame["cogs"] - frame["shipping_cost"]
    return frame


def frame_for_args(args):
    return to_frame(base_query(args).all())


def safe_percentage(numerator, denominator):
    return round(numerator / denominator * 100, 2) if denominator else 0


def overview(args):
    frame = frame_for_args(args)
    if frame.empty:
        return {
            "revenue": 0, "orders": 0, "units": 0, "customers": 0,
            "profit": 0, "aov": 0, "profit_margin": 0, "growth": 0,
        }
    revenue = float(frame["revenue"].sum())
    profit = float(frame["profit"].sum())
    orders = int(frame["order_id"].nunique())
    frame["order_date"] = pd.to_datetime(frame["order_date"])
    midpoint = frame["order_date"].min() + (frame["order_date"].max() - frame["order_date"].min()) / 2
    previous_revenue = float(frame.loc[frame["order_date"] < midpoint, "revenue"].sum())
    current_revenue = float(frame.loc[frame["order_date"] >= midpoint, "revenue"].sum())
    growth = safe_percentage(current_revenue - previous_revenue, previous_revenue)
    return {
        "revenue": round(revenue, 2),
        "orders": orders,
        "units": int(frame["quantity"].sum()),
        "customers": int(frame["customer_id"].nunique()),
        "profit": round(profit, 2),
        "aov": round(revenue / orders, 2) if orders else 0,
        "profit_margin": safe_percentage(profit, revenue),
        "growth": growth,
    }


def revenue_trend(args, period="month"):
    frame = frame_for_args(args)
    if frame.empty:
        return []
    frame["order_date"] = pd.to_datetime(frame["order_date"])
    rule = {"day": "D", "week": "W", "month": "ME", "year": "YE"}[period]
    grouped = frame.set_index("order_date").resample(rule).agg(
        revenue=("revenue", "sum"),
        profit=("profit", "sum"),
    ).reset_index()
    result = []
    for row in grouped.itertuples():
        label = row.order_date.strftime("%Y-%m-%d") if period == "day" else (
            row.order_date.strftime("%Y-%m") if period in ("week", "month") else row.order_date.strftime("%Y")
        )
        result.append({"period": label, "revenue": round(float(row.revenue), 2), "profit": round(float(row.profit), 2)})
    return result


def sales_analytics(args):
    frame = frame_for_args(args)
    if frame.empty:
        return {"trend": [], "monthly": [], "growth": []}
    trend = revenue_trend(args, "day")
    frame["order_date"] = pd.to_datetime(frame["order_date"])
    frame["month"] = frame["order_date"].dt.strftime("%Y-%m")
    monthly = frame.groupby("month", as_index=False).agg(revenue=("revenue", "sum"), profit=("profit", "sum"))
    monthly["orders"] = frame.groupby("month")["order_id"].nunique().values
    monthly["revenue"] = monthly["revenue"].round(2)
    monthly["profit"] = monthly["profit"].round(2)
    monthly["growth"] = monthly["revenue"].pct_change().fillna(0).mul(100).round(2)
    return {
        "trend": trend,
        "monthly": monthly.to_dict(orient="records"),
        "growth": monthly[["month", "growth"]].to_dict(orient="records"),
    }


def product_analytics(args):
    frame = frame_for_args(args)
    if frame.empty:
        return {"top": [], "bottom": [], "categories": [], "table": []}
    table = frame.groupby(["product_id", "product_name", "category"], as_index=False).agg(
        units=("quantity", "sum"),
        revenue=("revenue", "sum"),
        profit=("profit", "sum"),
    )
    table["profit_margin"] = table.apply(
        lambda row: safe_percentage(row["profit"], row["revenue"]), axis=1
    )
    table = table.sort_values("revenue", ascending=False)
    top = table.head(10).to_dict(orient="records")
    bottom = table.tail(10).sort_values("revenue").to_dict(orient="records")
    categories = frame.groupby("category", as_index=False).agg(revenue=("revenue", "sum"), profit=("profit", "sum"))
    categories["revenue"] = categories["revenue"].round(2)
    categories["profit"] = categories["profit"].round(2)
    for item in top + bottom:
        item["revenue"] = round(float(item["revenue"]), 2)
        item["profit"] = round(float(item["profit"]), 2)
    table["revenue"] = table["revenue"].round(2)
    table["profit"] = table["profit"].round(2)
    return {
        "top": top,
        "bottom": bottom,
        "categories": categories.to_dict(orient="records"),
        "table": table.head(100).to_dict(orient="records"),
    }


def customer_analytics(args):
    frame = frame_for_args(args)
    if frame.empty:
        return {"ranking": [], "segments": {}, "summary": {}, "table": []}
    customer = frame.groupby(["customer_id", "customer_name"], as_index=False).agg(
        revenue=("revenue", "sum"),
        orders=("order_id", "nunique"),
        units=("quantity", "sum"),
        last_order=("order_date", "max"),
    )
    customer["average_order"] = (customer["revenue"] / customer["orders"]).round(2)
    customer["revenue"] = customer["revenue"].round(2)
    ranking = customer.sort_values("revenue", ascending=False).head(10).to_dict(orient="records")
    rfm_rows = frame[["customer_id", "customer_name", "order_id", "order_date", "revenue"]].to_dict(orient="records")
    from app.services.rfm_service import calculate_rfm
    rfm, segments = calculate_rfm(rfm_rows)
    return {
        "ranking": ranking,
        "segments": segments,
        "summary": {"unique_customers": int(customer["customer_id"].nunique()), "average_spending": round(float(customer["revenue"].mean()), 2)},
        "table": rfm,
    }


def region_analytics(args):
    frame = frame_for_args(args)
    if frame.empty:
        return {"table": [], "top": None, "bottom": None}
    regions = frame.groupby("region", as_index=False).agg(
        revenue=("revenue", "sum"),
        profit=("profit", "sum"),
        units=("quantity", "sum"),
    )
    regions["orders"] = frame.groupby("region")["order_id"].nunique().values
    regions["revenue"] = regions["revenue"].round(2)
    regions["profit"] = regions["profit"].round(2)
    regions = regions.sort_values("revenue", ascending=False)
    table = regions.to_dict(orient="records")
    return {"table": table, "top": table[0] if table else None, "bottom": table[-1] if table else None}
