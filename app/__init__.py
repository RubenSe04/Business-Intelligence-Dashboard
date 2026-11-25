from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.models import db


def create_app(config_object=None):
    app = Flask(__name__)
    app.config.from_object(config_object or Config)
    CORS(app)
    db.init_app(app)

    from app.routes.dashboard import dashboard_bp
    from app.routes.analytics import analytics_bp
    from app.routes.datasets import datasets_bp
    from app.routes.reports import reports_bp

    app.register_blueprint(dashboard_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(datasets_bp)
    app.register_blueprint(reports_bp)

    with app.app_context():
        db.create_all()
        from app.services.demo_service import ensure_demo_data
        ensure_demo_data()

    return app
