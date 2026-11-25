from flask import Blueprint, render_template, request

from app.routes import success
from app.services.analytics_service import (
    frame_for_args, overview, revenue_trend,
)

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.get("/")
def index():
    return render_template("dashboard.html")


@dashboard_bp.get("/api/dashboard/overview")
def api_overview():
    return success(overview(request.args))


@dashboard_bp.get("/api/dashboard/revenue-trend")
def api_revenue_trend():
    period = request.args.get("period", "month")
    if period not in {"day", "week", "month", "year"}:
        period = "month"
    return success(revenue_trend(request.args, period))


@dashboard_bp.get("/api/dashboard/categories")
def api_categories():
    frame = frame_for_args(request.args)
    if frame.empty:
        return success([])
    result = frame.groupby("category", as_index=False)["revenue"].sum()
    result["revenue"] = result["revenue"].round(2)
    return success(result.to_dict(orient="records"))


@dashboard_bp.get("/api/dashboard/top-products")
def api_top_products():
    frame = frame_for_args(request.args)
    if frame.empty:
        return success([])
    result = frame.groupby("product_name", as_index=False).agg(revenue=("revenue", "sum"), units=("quantity", "sum"))
    result = result.sort_values("revenue", ascending=False).head(10)
    result["revenue"] = result["revenue"].round(2)
    return success(result.to_dict(orient="records"))


@dashboard_bp.get("/api/dashboard/regions")
def api_regions():
    frame = frame_for_args(request.args)
    if frame.empty:
        return success([])
    result = frame.groupby("region", as_index=False).agg(revenue=("revenue", "sum"), profit=("profit", "sum"))
    result[["revenue", "profit"]] = result[["revenue", "profit"]].round(2)
    return success(result.to_dict(orient="records"))


@dashboard_bp.get("/api/dashboard/recent")
def api_recent():
    frame = frame_for_args(request.args)
    if frame.empty:
        return success([])
    frame = frame.sort_values("order_date", ascending=False)
    columns = ["order_id", "order_date", "customer_name", "product_name", "category", "region", "revenue", "order_status"]
    result = frame[columns].head(12).copy()
    result["order_date"] = result["order_date"].astype(str)
    result["revenue"] = result["revenue"].round(2)
    return success(result.to_dict(orient="records"))


@dashboard_bp.get("/settings")
def settings_page():
    return render_template("settings.html")


@dashboard_bp.get("/api/dashboard/filter-options")
def api_filter_options():
    from app.models.sales import SalesTransaction
    from app.models.dataset import Dataset
    def values(column):
        return [row[0] for row in SalesTransaction.query.with_entities(column).filter(column.isnot(None)).distinct().order_by(column).all()]
    active_ds = Dataset.query.filter_by(dataset_status="active").order_by(Dataset.upload_date.desc()).first()
    sample_order = SalesTransaction.query.with_entities(SalesTransaction.order_id, SalesTransaction.unit_price).first()
    is_idr = False
    active_preset = "custom"
    if active_ds:
        if "idr" in (active_ds.original_filename or "").lower() or "indonesia" in (active_ds.dataset_name or "").lower():
            is_idr = True
            active_preset = "indonesia"
        elif "usd" in (active_ds.original_filename or "").lower() or "synthetic" in (active_ds.dataset_name or "").lower():
            active_preset = "global"
    if not is_idr and sample_order and (str(sample_order[0]).startswith("INV-ID") or float(sample_order[1] or 0) >= 50000):
        is_idr = True
        if active_preset == "custom":
            active_preset = "indonesia"
    return success({
        "regions": values(SalesTransaction.region),
        "categories": values(SalesTransaction.category),
        "products": values(SalesTransaction.product_name),
        "statuses": values(SalesTransaction.order_status),
        "currency": "IDR" if is_idr else "USD",
        "active_preset": active_preset,
        "dataset_name": active_ds.dataset_name if active_ds else "Active Dataset",
    })
