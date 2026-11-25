from app.services.demo_service import generate_demo_rows
from app.models.sales import SalesTransaction


def test_net_revenue_formula():
    row = SalesTransaction(
        quantity=4,
        unit_price=100,
        discount_percentage=10,
        unit_cost=60,
        shipping_cost=20,
    )
    assert row.net_revenue == 360
    assert row.profit == 100


def test_demo_dataset_constraints():
    rows = generate_demo_rows()
    assert len(rows) >= 1000
    assert len({row["customer_id"] for row in rows}) >= 100
    assert len({row["product_id"] for row in rows}) >= 30
    assert len({row["category"] for row in rows}) >= 5
    assert len({row["region"] for row in rows}) >= 5
