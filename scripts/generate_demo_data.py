from app import create_app
from app.services.demo_service import reload_demo_data


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        reload_demo_data()
        print("Synthetic demo data regenerated successfully.")
