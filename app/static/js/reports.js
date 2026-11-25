const ReportApp = window.App;

function getReportParams() {
  const params = new URLSearchParams();
  const start = document.getElementById("reportStart")?.value;
  const end = document.getElementById("reportEnd")?.value;
  const region = document.getElementById("reportRegion")?.value;
  const category = document.getElementById("reportCategory")?.value;
  if (start) params.set("start_date", start);
  if (end) params.set("end_date", end);
  if (region) params.set("region", region);
  if (category) params.set("category", category);
  return params;
}

async function populateReportSelectors() {
  const data = await ReportApp.loadFilterOptions();
  if (!data) return;
  const region = document.getElementById("reportRegion");
  const category = document.getElementById("reportCategory");
  if (region) {
    const cur = region.value;
    region.innerHTML = `<option value="" data-i18n="filter.allRegions">${ReportApp.t("filter.allRegions", "Semua wilayah")}</option>`;
    (data.regions || []).forEach((v) => region.append(new Option(v, v)));
    if ((data.regions || []).includes(cur)) region.value = cur;
  }
  if (category) {
    const cur = category.value;
    category.innerHTML = `<option value="" data-i18n="filter.allCategories">${ReportApp.t("filter.allCategories", "Semua kategori")}</option>`;
    (data.categories || []).forEach((v) => category.append(new Option(v, v)));
    if ((data.categories || []).includes(cur)) category.value = cur;
  }
}

async function updateReportPreview() {
  try {
    const paramsObj = Object.fromEntries(getReportParams().entries());
    const overview = await ReportApp.get("/api/dashboard/overview", paramsObj);
    ReportApp.animateValue("reportPreviewOrders", overview.orders, ReportApp.number, 500);
    ReportApp.animateValue("reportPreviewRevenue", overview.revenue, ReportApp.currency, 550);
    ReportApp.animateValue("reportPreviewProfit", overview.profit, ReportApp.currency, 550);
    ReportApp.animateValue("reportPreviewMargin", overview.profit_margin, (v) => ReportApp.percent(v, 1), 500);
  } catch (error) {
    ReportApp.toast(error.message, "error");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await populateReportSelectors();
  updateReportPreview();

  ["reportStart", "reportEnd", "reportRegion", "reportCategory"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", updateReportPreview);
  });

  window.addEventListener("nexusfilters", async () => {
    await populateReportSelectors();
    updateReportPreview();
  });

  window.addEventListener("nexuslangchange", () => {
    populateReportSelectors();
    updateReportPreview();
  });

  document.getElementById("resetReportParams")?.addEventListener("click", () => {
    ["reportStart", "reportEnd", "reportRegion", "reportCategory"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    updateReportPreview();
    ReportApp.toast(
      ReportApp.getLang() === "id"
        ? "Parameter laporan direset ke cakupan penuh."
        : "Report parameters reset to full scope."
    );
  });

  document.querySelectorAll(".export-option").forEach((button) =>
    button.addEventListener("click", () => {
      const params = getReportParams();
      const format = button.dataset.format;
      const route = format === "excel" ? "excel" : format === "pdf" ? "pdf" : "csv";
      ReportApp.toast(
        ReportApp.getLang() === "id"
          ? `Menyiapkan dokumen ${format.toUpperCase()}...`
          : `Compiling ${format.toUpperCase()} deliverable...`
      );
      window.location.href = `/api/reports/export/${route}?${params.toString()}`;
    })
  );
});
