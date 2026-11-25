import os
from pathlib import Path
import pandas as pd
from werkzeug.utils import secure_filename
from flask import Blueprint, render_template, request, current_app, send_from_directory

from app.models import db
from app.models.dataset import Dataset, ImportLog
from app.models.sales import SalesTransaction
from app.routes import success, error
from app.services.data_processor import read_upload, validate_dataframe
from app.services.demo_service import reload_demo_data

datasets_bp = Blueprint("datasets", __name__)


@datasets_bp.get("/data")
def data_page():
    return render_template("datasets.html")


def allowed(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in current_app.config["ALLOWED_EXTENSIONS"]


@datasets_bp.post("/api/datasets/upload")
def upload():
    if "file" not in request.files:
        return error("No file was included.", 400)
    file = request.files["file"]
    if not file.filename:
        return error("Please select a file.", 400)
    if not allowed(file.filename):
        return error("Only CSV and Excel (.xlsx, .xls) files are allowed.", 415)

    os.makedirs(current_app.config["UPLOAD_FOLDER"], exist_ok=True)
    filename = secure_filename(file.filename)
    path = Path(current_app.config["UPLOAD_FOLDER"]) / f"{int(__import__('time').time())}_{filename}"
    file.save(path)
    try:
        dataframe = read_upload(path)
    except Exception:
        path.unlink(missing_ok=True)
        return error("The file could not be parsed. Check that it is a valid CSV or Excel workbook.", 422)
    validation = validate_dataframe(dataframe)

    dataset = Dataset(
        dataset_name=Path(filename).stem,
        original_filename=filename,
        total_rows=validation["total_rows"],
        total_columns=validation["total_columns"],
        dataset_status="pending",
    )
    db.session.add(dataset)
    db.session.flush()
    dataset_path = Path(current_app.config["UPLOAD_FOLDER"]) / f"dataset_{dataset.id}.source"
    path.replace(dataset_path)
    db.session.commit()
    validation["dataset_id"] = dataset.id
    return success(validation)


@datasets_bp.get("/api/datasets")
def datasets_api():
    datasets = Dataset.query.order_by(Dataset.upload_date.desc()).all()
    return success([
        {
            "id": item.id,
            "dataset_name": item.dataset_name,
            "original_filename": item.original_filename,
            "total_rows": item.total_rows,
            "total_columns": item.total_columns,
            "upload_date": item.upload_date.isoformat(),
            "dataset_status": item.dataset_status,
        }
        for item in datasets
    ])


@datasets_bp.get("/api/datasets/preview/<int:dataset_id>")
def preview(dataset_id):
    dataset = db.session.get(Dataset, dataset_id)
    if not dataset:
        return error("Dataset not found.", 404)
    path = Path(current_app.config["UPLOAD_FOLDER"]) / f"dataset_{dataset_id}.source"
    if not path.exists():
        return error("The uploaded source file is no longer available.", 410)
    try:
        dataframe = read_upload(path)
        validation = validate_dataframe(dataframe)
        validation["dataset_id"] = dataset_id
        return success(validation)
    except Exception:
        return error("The dataset preview could not be generated.", 422)


@datasets_bp.post("/api/datasets/import/<int:dataset_id>")
def import_dataset(dataset_id):
    dataset = db.session.get(Dataset, dataset_id)
    if not dataset:
        return error("Dataset not found.", 404)
    path = Path(current_app.config["UPLOAD_FOLDER"]) / f"dataset_{dataset_id}.source"
    if not path.exists():
        return error("The uploaded source file is no longer available.", 410)
    try:
        dataframe = read_upload(path)
        validation = validate_dataframe(dataframe)
        if not validation["valid"]:
            return error("The dataset has missing required columns or invalid values.", 422)
        from app.services.data_processor import NUMERIC_COLUMNS
        dataframe = dataframe.copy()
        dataframe.columns = (
            dataframe.columns.astype(str).str.strip().str.lower()
            .str.replace(r"[^a-z0-9]+", "_", regex=True).str.strip("_")
        )
        dataframe["order_date"] = pd.to_datetime(dataframe["order_date"], errors="coerce")
        dataframe = dataframe.drop_duplicates()
        imported = 0
        SalesTransaction.query.delete()
        for record in dataframe.to_dict(orient="records"):
            if pd.isna(record["order_date"]):
                continue
            sales = SalesTransaction(
                dataset_id=dataset_id,
                order_id=str(record["order_id"]),
                order_date=record["order_date"].date(),
                customer_id=str(record["customer_id"]),
                customer_name=str(record["customer_name"]),
                product_id=str(record["product_id"]),
                product_name=str(record["product_name"]),
                category=str(record["category"]),
                region=str(record["region"]),
                city=str(record["city"]),
                quantity=int(record["quantity"]),
                unit_price=float(record["unit_price"]),
                discount_percentage=float(record["discount_percentage"]),
                unit_cost=float(record["unit_cost"]),
                shipping_cost=float(record["shipping_cost"]),
                payment_method=str(record["payment_method"]),
                order_status=str(record["order_status"]),
            )
            db.session.add(sales)
            imported += 1
        dataset.dataset_status = "active"
        Dataset.query.filter(Dataset.id != dataset_id).update({"dataset_status": "archived"})
        log = ImportLog(
            dataset_id=dataset_id,
            imported_rows=imported,
            rejected_rows=len(dataframe) - imported,
            duplicate_rows=validation["duplicate_rows"],
            import_status="success",
            import_message="Dataset imported successfully.",
        )
        db.session.add(log)
        db.session.commit()
        return success({"imported_rows": imported, "dataset_id": dataset_id})
    except Exception as exc:
        db.session.rollback()
        return error("The dataset could not be imported.", 422)


@datasets_bp.delete("/api/datasets/<int:dataset_id>")
def delete_dataset(dataset_id):
    dataset = db.session.get(Dataset, dataset_id)
    if not dataset:
        return error("Dataset not found.", 404)
    SalesTransaction.query.filter_by(dataset_id=dataset_id).delete()
    ImportLog.query.filter_by(dataset_id=dataset_id).delete()
    db.session.delete(dataset)
    path = Path(current_app.config["UPLOAD_FOLDER"]) / f"dataset_{dataset_id}.source"
    if path.exists():
        path.unlink()
    db.session.commit()
    return success({"deleted": dataset_id})


@datasets_bp.post("/api/datasets/demo/reload")
def reload_demo():
    payload = request.get_json(silent=True) or {}
    preset = payload.get("preset") or request.args.get("preset") or "indonesia"
    info = reload_demo_data(preset=preset)
    msg = (
        "Dataset kasus bisnis Indonesia (Rupiah / IDR) berhasil dimuat."
        if info["preset"] == "indonesia"
        else "Synthetic Global dataset (USD) reloaded."
    )
    return success({"message": msg, **info})

