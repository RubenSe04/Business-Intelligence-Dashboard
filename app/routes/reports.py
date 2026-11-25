from datetime import date

from flask import Blueprint, render_template, request, send_file
from io import BytesIO

from app.services.analytics_service import frame_for_args
from app.services.report_service import export_csv, export_excel

reports_bp = Blueprint("reports", __name__)


@reports_bp.get("/reports")
def reports_page():
    return render_template("reports.html")


@reports_bp.get("/api/reports/export/csv")
def export_csv_report():
    frame = frame_for_args(request.args)
    if frame.empty:
        frame = frame.assign(order_id=[], order_date=[], customer_name=[], product_name=[], revenue=[], profit=[], order_status=[]).head(0)
    columns = [
        "order_id", "order_date", "customer_name", "product_name", "category",
        "region", "quantity", "revenue", "profit", "order_status",
    ]
    frame = frame[[column for column in columns if column in frame.columns]]
    frame["order_date"] = frame["order_date"].astype(str)
    return send_file(
        export_csv(frame),
        mimetype="text/csv",
        as_attachment=True,
        download_name=f"sales-report-{date.today().isoformat()}.csv",
    )


@reports_bp.get("/api/reports/export/excel")
def export_excel_report():
    frame = frame_for_args(request.args)
    if frame.empty:
        frame = frame.assign(order_id=[], order_date=[], customer_name=[], product_name=[], revenue=[], profit=[], order_status=[]).head(0)
    columns = [
        "order_id", "order_date", "customer_name", "product_name", "category",
        "region", "quantity", "revenue", "profit", "order_status",
    ]
    frame = frame[[column for column in columns if column in frame.columns]]
    frame["order_date"] = frame["order_date"].astype(str)
    return send_file(
        export_excel(frame),
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        as_attachment=True,
        download_name=f"sales-report-{date.today().isoformat()}.xlsx",
    )


@reports_bp.get("/api/reports/export/pdf")
def export_pdf_report():
    try:
        from reportlab.lib import colors
        from reportlab.lib.pagesizes import A4, landscape
        from reportlab.lib.styles import getSampleStyleSheet
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
    except ImportError:
        return ("PDF support requires reportlab.", 503)

    frame = frame_for_args(request.args)
    revenue = round(float(frame["revenue"].sum()), 2) if not frame.empty else 0
    profit = round(float(frame["profit"].sum()), 2) if not frame.empty else 0
    output = BytesIO()
    document = SimpleDocTemplate(output, pagesize=landscape(A4))
    styles = getSampleStyleSheet()
    elements = [
        Paragraph("Sales Performance Report", styles["Title"]),
        Paragraph(f"Generated: {date.today().isoformat()} | Period: {request.args.get('start_date', 'All')} to {request.args.get('end_date', 'All')}", styles["Normal"]),
        Spacer(1, 16),
        Paragraph(f"Revenue: {revenue:,.2f}", styles["Heading2"]),
        Paragraph(f"Profit: {profit:,.2f}", styles["Heading2"]),
        Spacer(1, 12),
    ]
    if not frame.empty:
        rows = frame[["order_id", "order_date", "customer_name", "product_name", "region", "revenue", "profit"]].head(20).copy()
        rows["order_date"] = rows["order_date"].astype(str)
        data = [list(rows.columns)] + rows.astype(object).where(rows.notna(), "").values.tolist()
        table = Table(data, repeatRows=1)
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2563EB")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#CBD5E1")),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 8),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
        ]))
        elements.append(table)
    document.build(elements)
    output.seek(0)
    return send_file(output, mimetype="application/pdf", as_attachment=True, download_name=f"sales-report-{date.today().isoformat()}.pdf")
