import pytest

from app import create_app


@pytest.fixture()
def client(tmp_path):
    class TestConfig:
        TESTING = True
        SQLALCHEMY_DATABASE_URI = f"sqlite:///{tmp_path / 'test.db'}"
        SQLALCHEMY_TRACK_MODIFICATIONS = False
        UPLOAD_FOLDER = str(tmp_path / "uploads")
        EXPORT_FOLDER = str(tmp_path / "exports")
        ALLOWED_EXTENSIONS = {"csv", "xlsx", "xls"}
        SECRET_KEY = "test"

    app = create_app(TestConfig)
    return app.test_client()


def test_overview_api(client):
    response = client.get("/api/dashboard/overview")
    assert response.status_code == 200
    assert response.get_json()["success"] is True


def test_pages(client):
    for route in ["/", "/sales", "/products", "/customers", "/regions", "/reports", "/data", "/settings"]:
        res = client.get(route)
        assert res.status_code == 200
        html = res.get_data(as_text=True)
        assert "sidebar" in html
        assert "confirmModal" in html


def test_all_analytics_and_filter_endpoints(client):
    endpoints = [
        "/api/dashboard/overview",
        "/api/dashboard/overview?start_date=2025-01-01&end_date=2025-12-31",
        "/api/dashboard/revenue-trend?period=month",
        "/api/dashboard/categories",
        "/api/dashboard/top-products",
        "/api/dashboard/regions",
        "/api/dashboard/recent",
        "/api/dashboard/filter-options",
        "/api/analytics/sales",
        "/api/analytics/products",
        "/api/analytics/customers",
        "/api/analytics/regions",
        "/api/datasets",
    ]
    for ep in endpoints:
        response = client.get(ep)
        assert response.status_code == 200
        payload = response.get_json()
        assert payload["success"] is True
        assert "data" in payload

