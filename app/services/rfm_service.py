from datetime import date
import pandas as pd


def calculate_rfm(rows, reference_date=None):
    if not rows:
        return [], {}
    frame = pd.DataFrame(rows)
    frame["order_date"] = pd.to_datetime(frame["order_date"])
    frame["revenue"] = pd.to_numeric(frame["revenue"], errors="coerce").fillna(0)
    reference = pd.Timestamp(reference_date or frame["order_date"].max())

    rfm = frame.groupby(["customer_id", "customer_name"], as_index=False).agg(
        recency=("order_date", lambda values: (reference - values.max()).days),
        frequency=("order_id", "nunique"),
        monetary=("revenue", "sum"),
    )
    rfm["recency_score"] = pd.qcut(rfm["recency"].rank(method="first"), 5, labels=[5, 4, 3, 2, 1]).astype(int)
    rfm["frequency_score"] = pd.qcut(rfm["frequency"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5]).astype(int)
    rfm["monetary_score"] = pd.qcut(rfm["monetary"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5]).astype(int)

    def segment(row):
        r, f = int(row["recency_score"]), int(row["frequency_score"])
        if r >= 4 and f >= 4:
            return "Champions"
        if f >= 4:
            return "Loyal Customers"
        if r >= 4:
            return "Potential Loyalists"
        if r >= 3:
            return "New Customers"
        if f >= 2:
            return "At Risk"
        return "Lost Customers"

    rfm["segment"] = rfm.apply(segment, axis=1)
    summary = rfm["segment"].value_counts().to_dict()
    return rfm.sort_values(["monetary", "frequency"], ascending=False).head(100).to_dict(orient="records"), summary
