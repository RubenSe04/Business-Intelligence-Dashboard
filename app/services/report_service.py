from io import BytesIO

import pandas as pd
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill


def export_csv(frame):
    output = BytesIO()
    frame.to_csv(output, index=False)
    output.seek(0)
    return output


def export_excel(frame):
    output = BytesIO()
    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Sales Report"
    for column, name in enumerate(frame.columns, start=1):
        cell = sheet.cell(row=1, column=column, value=name)
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="2563EB")
    for row_index, row in enumerate(frame.itertuples(index=False), start=2):
        for column, value in enumerate(row, start=1):
            sheet.cell(row=row_index, column=column, value=value)
    for column in sheet.columns:
        sheet.column_dimensions[column[0].column_letter].width = 18
    workbook.save(output)
    output.seek(0)
    return output
