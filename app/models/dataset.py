from datetime import datetime

from app.models import db


class Dataset(db.Model):
    __tablename__ = "datasets"

    id = db.Column(db.Integer, primary_key=True)
    dataset_name = db.Column(db.String(180), nullable=False)
    original_filename = db.Column(db.String(255), nullable=False)
    total_rows = db.Column(db.Integer, nullable=False, default=0)
    total_columns = db.Column(db.Integer, nullable=False, default=0)
    upload_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    dataset_status = db.Column(db.String(30), nullable=False, default="pending")


class ImportLog(db.Model):
    __tablename__ = "import_logs"

    id = db.Column(db.Integer, primary_key=True)
    dataset_id = db.Column(db.Integer, db.ForeignKey("datasets.id"), nullable=False, index=True)
    imported_rows = db.Column(db.Integer, nullable=False, default=0)
    rejected_rows = db.Column(db.Integer, nullable=False, default=0)
    duplicate_rows = db.Column(db.Integer, nullable=False, default=0)
    import_status = db.Column(db.String(30), nullable=False)
    import_message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
