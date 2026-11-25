from flask import Blueprint, render_template, request

from app.routes import success
from app.services.analytics_service import (
    sales_analytics, product_analytics, customer_analytics, region_analytics,
)

analytics_bp = Blueprint("analytics", __name__)


@analytics_bp.get("/sales")
def sales_page():
    return render_template("sales.html")


@analytics_bp.get("/products")
def products_page():
    return render_template("products.html")


@analytics_bp.get("/customers")
def customers_page():
    return render_template("customers.html")


@analytics_bp.get("/regions")
def regions_page():
    return render_template("regions.html")


@analytics_bp.get("/api/analytics/sales")
def sales_api():
    return success(sales_analytics(request.args))


@analytics_bp.get("/api/analytics/products")
def products_api():
    return success(product_analytics(request.args))


@analytics_bp.get("/api/analytics/customers")
def customers_api():
    return success(customer_analytics(request.args))


@analytics_bp.get("/api/analytics/regions")
def regions_api():
    return success(region_analytics(request.args))
