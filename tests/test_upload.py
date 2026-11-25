import io
import pandas as pd

from app.services.data_processor import validate_dataframe


def test_validation_accepts_required_schema():
    frame = pd.DataFrame([{
        "order_id":"ORD-1","order_date":"2025-01-01","customer_id":"C1","customer_name":"Customer",
        "product_id":"P1","product_name":"Laptop","category":"Electronics","region":"Europe","city":"London",
        "quantity":2,"unit_price":100,"discount_percentage":10,"unit_cost":60,"shipping_cost":10,
        "payment_method":"Card","order_status":"Completed",
    }])
    result = validate_dataframe(frame)
    assert result["valid"] is True
    assert result["missing_columns"] == []


def test_validation_rejects_missing_column():
    frame = pd.DataFrame([{"order_id":"ORD-1"}])
    result = validate_dataframe(frame)
    assert result["valid"] is False
    assert "order_date" in result["missing_columns"]
