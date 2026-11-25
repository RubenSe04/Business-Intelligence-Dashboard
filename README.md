# NexusBI — Sales Performance & Business Analytics

NexusBI is a Flask and SQLAlchemy business intelligence application for sales, product, customer, regional, and data-management analytics.

## Project overview

The application combines transactional sales data with interactive dashboards, RFM customer segmentation, CSV/Excel imports, data validation, and report exports. The bundled demo dataset is synthetic and does not contain real customer or company data.

## Technology

- Python 3 / Flask
- Flask-SQLAlchemy and SQLAlchemy
- MySQL in production; SQLite works as a local fallback
- Pandas, NumPy, OpenPyXL
- Bootstrap 5, Bootstrap Icons, Chart.js
- Pytest

## Run locally

```powershell
cd "business-intelligence-dashboard"
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```

Open `http://127.0.0.1:5000`.

On first launch the app creates `business_intelligence.db` and loads approximately 1,200 deterministic synthetic transactions.

## MySQL

Create the database and tables:

```powershell
mysql -u root -p < database/schema.sql
```

Copy `.env.example` to `.env` and set `DATABASE_URL`, for example:

```text
DATABASE_URL=mysql+pymysql://root:password@localhost/business_intelligence_db
```

## Data import

CSV and Excel files must contain these columns:

`order_id`, `order_date`, `customer_id`, `customer_name`, `product_id`, `product_name`, `category`, `region`, `city`, `quantity`, `unit_price`, `discount_percentage`, `unit_cost`, `shipping_cost`, `payment_method`, `order_status`.

Uploads are previewed and validated before import. Only a confirmed, active dataset replaces the current analytics dataset.

## Calculations

- Net Revenue = Quantity × Unit Price × (1 - Discount / 100)
- COGS = Quantity × Unit Cost
- Profit = Net Revenue - COGS - Shipping Cost
- Profit Margin = Profit / Net Revenue × 100
- AOV = Net Revenue / Unique Order IDs
- Main analytics include only `Completed` transactions unless an explicit status filter is selected.

## RFM segmentation

Customers are grouped using Recency, Frequency, and Monetary scores from 1–5. The UI reports Champions, Loyal Customers, Potential Loyalists, New Customers, At Risk, and Lost Customers.

## Tests

```powershell
pytest -q
```

## Portfolio description

Designed and developed a full-stack sales intelligence platform using Flask, SQLAlchemy, MySQL, Pandas, and interactive web analytics. Implemented dataset validation and import workflows, RFM segmentation, dynamic BI filters, and CSV, Excel, and PDF reporting.
