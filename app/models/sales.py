from datetime import datetime

from app.models import db


class SalesTransaction(db.Model):
    __tablename__ = "sales_transactions"

    id = db.Column(db.Integer, primary_key=True)
    dataset_id = db.Column(db.Integer, db.ForeignKey("datasets.id"), nullable=True, index=True)
    order_id = db.Column(db.String(64), nullable=False, index=True)
    order_date = db.Column(db.Date, nullable=False, index=True)
    customer_id = db.Column(db.String(64), nullable=False, index=True)
    customer_name = db.Column(db.String(160), nullable=False)
    product_id = db.Column(db.String(64), nullable=False, index=True)
    product_name = db.Column(db.String(160), nullable=False)
    category = db.Column(db.String(100), nullable=False, index=True)
    region = db.Column(db.String(100), nullable=False, index=True)
    city = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(12, 2), nullable=False)
    discount_percentage = db.Column(db.Numeric(7, 2), nullable=False, default=0)
    unit_cost = db.Column(db.Numeric(12, 2), nullable=False)
    shipping_cost = db.Column(db.Numeric(12, 2), nullable=False, default=0)
    payment_method = db.Column(db.String(60), nullable=False)
    order_status = db.Column(db.String(30), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    @property
    def gross_sales(self):
        return float(self.quantity or 0) * float(self.unit_price or 0)

    @property
    def net_revenue(self):
        return self.gross_sales * (1 - float(self.discount_percentage or 0) / 100)

    @property
    def profit(self):
        cogs = float(self.quantity or 0) * float(self.unit_cost or 0)
        return self.net_revenue - cogs - float(self.shipping_cost or 0)
