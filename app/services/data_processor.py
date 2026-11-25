import pandas as pd
from datetime import datetime


REQUIRED_COLUMNS = [
    "order_id", "order_date", "customer_id", "customer_name", "product_id",
    "product_name", "category", "region", "city", "quantity", "unit_price",
    "discount_percentage", "unit_cost", "shipping_cost", "payment_method",
    "order_status",
]

NUMERIC_COLUMNS = [
    "quantity", "unit_price", "discount_percentage", "unit_cost", "shipping_cost",
]


def normalize_columns(dataframe):
    dataframe.columns = (
        dataframe.columns.astype(str)
        .str.strip()
        .str.lower()
        .str.replace(r"[^a-z0-9]+", "_", regex=True)
        .str.strip("_")
    )
    return dataframe


def read_upload(file_path):
    if str(file_path).lower().endswith(".csv"):
        return pd.read_csv(file_path)
    return pd.read_excel(file_path)


def validate_dataframe(dataframe):
    dataframe = normalize_columns(dataframe.copy())
    missing_columns = [column for column in REQUIRED_COLUMNS if column not in dataframe.columns]
    data = dataframe.copy()
    if "order_date" in data:
        data["order_date"] = pd.to_datetime(data["order_date"], errors="coerce")
    for column in NUMERIC_COLUMNS:
        if column in data:
            data[column] = pd.to_numeric(data[column], errors="coerce")

    missing_values = int(data.isna().sum().sum())
    duplicate_rows = int(data.duplicated().sum())
    invalid_records = 0
    if "order_date" in data:
        invalid_records += int(data["order_date"].isna().sum())
    for column in NUMERIC_COLUMNS:
        if column in data:
            invalid_records += int(data[column].isna().sum())
    if "discount_percentage" in data:
        invalid_records += int(
            data["discount_percentage"].dropna().apply(lambda value: value < 0 or value > 100).sum()
        )

    valid = not missing_columns and missing_values == 0 and invalid_records == 0
    return {
        "valid": valid,
        "missing_columns": missing_columns,
        "total_rows": len(data),
        "total_columns": len(data.columns),
        "missing_values": missing_values,
        "duplicate_rows": duplicate_rows,
        "invalid_records": int(invalid_records),
        "preview": data.head(20).where(pd.notna(data.head(20)), None).to_dict(orient="records"),
        "normalized_columns": list(data.columns),
    }
