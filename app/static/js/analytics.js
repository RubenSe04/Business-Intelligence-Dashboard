const AnalyticsApp = window.App;

let monthlySalesManager = null;
let productTableManager = null;
let customerTableManager = null;
let regionTableManager = null;

function reloadCurrentAnalyticsPage() {
  if (document.getElementById("salesTrendChart")) loadSalesAnalytics();
  if (document.getElementById("topProductsChart")) loadProductAnalytics();
  if (document.getElementById("segmentChart")) loadCustomerAnalytics();
  if (document.getElementById("regionComparisonChart")) loadRegionAnalytics();
}

window.addEventListener("nexusfilters", reloadCurrentAnalyticsPage);
window.addEventListener("nexuslangchange", reloadCurrentAnalyticsPage);

async function loadSalesAnalytics() {
  try {
    await AnalyticsApp.loadFilterOptions();
    const isId = AnalyticsApp.getLang() === "id";

    if (!monthlySalesManager) {
      monthlySalesManager = AnalyticsApp.createTableManager({
        tableId: "monthlySalesTableEl",
        tbodyId: "monthlySalesTable",
        searchInputId: "monthlySalesSearch",
        footerId: "monthlySalesFooter",
        pageSize: 12,
        emptyCols: 6,
        emptyMessage: () =>
          AnalyticsApp.getLang() === "id"
            ? "Tidak ada data penjualan bulanan untuk filter ini."
            : "No monthly sales records match the current filters.",
        renderRow: (i) => {
          const margin = i.revenue ? (i.profit / i.revenue) * 100 : 0;
          const growthSign = i.growth > 0 ? "+" : "";
          return `
            <tr>
              <td><strong style="font-family:var(--font-mono)">${i.month}</strong></td>
              <td class="num-col">${AnalyticsApp.number(i.orders || 0)}</td>
              <td class="num-col"><strong>${AnalyticsApp.currency(i.revenue)}</strong></td>
              <td class="num-col">${AnalyticsApp.currency(i.profit)}</td>
              <td class="num-col">${margin.toFixed(1)}%</td>
              <td class="num-col"><span class="variance-pill ${i.growth >= 0 ? "pos" : "neg"}">${growthSign}${i.growth.toFixed(1)}%</span></td>
            </tr>
          `;
        },
      });

      document.getElementById("exportSalesCsv")?.addEventListener("click", () => {
        AnalyticsApp.toast(
          AnalyticsApp.getLang() === "id"
            ? "Mengunduh buku besar penjualan CSV..."
            : "Downloading filtered CSV sales ledger..."
        );
        window.location.href = "/api/reports/export/csv?" + AnalyticsApp.queryParams();
      });
    }

    const data = await AnalyticsApp.get("/api/analytics/sales");
    const enrichedMonthly = (data.monthly || []).map((m) => ({
      ...m,
      margin: m.revenue ? Number(((m.profit / m.revenue) * 100).toFixed(2)) : 0,
    }));

    const totalRev = enrichedMonthly.reduce((s, i) => s + i.revenue, 0);
    const totalProf = enrichedMonthly.reduce((s, i) => s + i.profit, 0);
    const peak = [...enrichedMonthly].sort((a, b) => b.revenue - a.revenue)[0];
    const avgGrowth =
      enrichedMonthly.length > 1
        ? enrichedMonthly.slice(1).reduce((s, i) => s + i.growth, 0) / (enrichedMonthly.length - 1)
        : 0;

    AnalyticsApp.animateValue("salesKpiRev", totalRev, AnalyticsApp.currency);
    AnalyticsApp.animateValue("salesKpiProfit", totalProf, AnalyticsApp.currency);
    AnalyticsApp.animateValue("salesKpiPeak", peak ? peak.revenue : 0, AnalyticsApp.currency);
    const peakMonthEl = document.getElementById("salesKpiPeakMonth");
    if (peakMonthEl)
      peakMonthEl.textContent = peak
        ? `${isId ? "Tercatat pada" : "Recorded in"} ${peak.month}`
        : isId
        ? "Tidak ada data"
        : "No data";
    AnalyticsApp.animateValue("salesKpiGrowth", avgGrowth, (v) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`);

    AnalyticsApp.chart("salesTrendChart", {
      type: "line",
      data: {
        labels: data.trend.map((i) => i.period),
        datasets: [
          {
            label: isId ? "Pendapatan Bersih" : "Net Revenue",
            data: data.trend.map((i) => i.revenue),
            borderColor: "#315F50",
            backgroundColor: "rgba(49, 95, 80, 0.055)",
            fill: true,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          {
            label: isId ? "Laba Bersih" : "Net Profit",
            data: data.trend.map((i) => i.profit),
            borderColor: "#8BA99A",
            tension: 0.35,
            borderWidth: 1.75,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: { position: "top", align: "end", labels: { boxWidth: 10, font: { size: 11 } } },
          tooltip: {
            callbacks: { label: (c) => `${c.dataset.label}: ${AnalyticsApp.currency(c.parsed.y)}` },
          },
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { maxTicksLimit: 10, font: { size: 10.5 } } },
          y: {
            grid: { color: "#EEEEE7" },
            border: { display: false },
            ticks: {
              callback: (v) => AnalyticsApp.compactCurrency(v),
              font: { family: "IBM Plex Mono", size: 10.5 },
            },
          },
        },
      },
    });

    AnalyticsApp.chart("salesGrowthChart", {
      type: "bar",
      data: {
        labels: enrichedMonthly.map((i) => i.month),
        datasets: [
          {
            label: "MoM Growth",
            data: enrichedMonthly.map((i) => i.growth),
            backgroundColor: enrichedMonthly.map((i) => (i.growth >= 0 ? "#315F50" : "#B85C50")),
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (c) => `${isId ? "Varians MoM" : "MoM Variance"}: ${c.parsed.y.toFixed(1)}%`,
            },
          },
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 10 } } },
          y: {
            grid: { color: "#EEEEE7" },
            border: { display: false },
            ticks: { callback: (v) => v + "%", font: { family: "IBM Plex Mono", size: 10 } },
          },
        },
      },
    });

    monthlySalesManager.setData(enrichedMonthly);
  } catch (error) {
    AnalyticsApp.toast(error.message, "error");
  }
}

async function loadProductAnalytics() {
  try {
    await AnalyticsApp.loadFilterOptions();
    const isId = AnalyticsApp.getLang() === "id";

    if (!productTableManager) {
      productTableManager = AnalyticsApp.createTableManager({
        tableId: "productTableEl",
        tbodyId: "productTable",
        searchInputId: "productTableSearch",
        footerId: "productTableFooter",
        pageSize: 10,
        emptyCols: 6,
        emptyMessage: () =>
          AnalyticsApp.getLang() === "id"
            ? "Tidak ada data performa produk untuk filter ini."
            : "No product performance data for this filter.",
        renderRow: (i) => `
          <tr>
            <td><strong>${i.product_name}</strong></td>
            <td><span class="segment-tag">${i.category}</span></td>
            <td class="num-col">${AnalyticsApp.number(i.units)}</td>
            <td class="num-col"><strong>${AnalyticsApp.currency(i.revenue)}</strong></td>
            <td class="num-col">${AnalyticsApp.currency(i.profit)}</td>
            <td class="num-col"><span class="variance-pill ${i.profit_margin >= 20 ? "pos" : ""}">${i.profit_margin.toFixed(1)}%</span></td>
          </tr>
        `,
      });
    }

    const data = await AnalyticsApp.get("/api/analytics/products");

    AnalyticsApp.animateValue("prodKpiCount", data.table.length, AnalyticsApp.number);
    AnalyticsApp.animateValue("prodKpiCategories", data.categories.length, AnalyticsApp.number);

    const leader = data.top?.[0];
    const leaderEl = document.getElementById("prodKpiLeader");
    const leaderRevEl = document.getElementById("prodKpiLeaderRev");
    if (leaderEl) leaderEl.textContent = leader ? leader.product_name : "—";
    if (leaderRevEl)
      leaderRevEl.textContent = leader
        ? `${AnalyticsApp.currency(leader.revenue)} ${isId ? "pendapatan bersih" : "net revenue"}`
        : "—";

    const marginLeader = [...(data.table || [])].sort((a, b) => b.profit_margin - a.profit_margin)[0];
    const mLeaderEl = document.getElementById("prodKpiMarginLeader");
    const mValEl = document.getElementById("prodKpiMarginVal");
    if (mLeaderEl) mLeaderEl.textContent = marginLeader ? marginLeader.product_name : "—";
    if (mValEl)
      mValEl.textContent = marginLeader
        ? `${marginLeader.profit_margin.toFixed(1)}% ${isId ? "margin bersih" : "net margin"}`
        : "—";

    AnalyticsApp.chart("topProductsChart", {
      type: "bar",
      data: {
        labels: data.top.slice(0, 8).map((i) => i.product_name),
        datasets: [
          {
            label: isId ? "Pendapatan Bersih" : "Net Revenue",
            data: data.top.slice(0, 8).map((i) => i.revenue),
            backgroundColor: "#315F50",
            borderRadius: 4,
            barThickness: 16,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y",
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (c) => `${isId ? "Pendapatan" : "Revenue"}: ${AnalyticsApp.currency(c.parsed.x)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: "#EEEEE7" },
            border: { display: false },
            ticks: {
              callback: (v) => AnalyticsApp.compactCurrency(v),
              font: { family: "IBM Plex Mono", size: 10 },
            },
          },
          y: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 11 } } },
        },
      },
    });

    AnalyticsApp.chart("productCategoryChart", {
      type: "doughnut",
      data: {
        labels: data.categories.map((i) => i.category),
        datasets: [
          {
            data: data.categories.map((i) => i.revenue),
            backgroundColor: ["#315F50", "#5E8576", "#8BA99A", "#C28A3E", "#777B75", "#B85C50"],
            borderWidth: 3,
            borderColor: AnalyticsApp.getTheme() === "dark" ? "#171B20" : "#FFFFFF",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "66%",
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } },
          tooltip: { callbacks: { label: (c) => `${c.label}: ${AnalyticsApp.currency(c.parsed)}` } },
        },
      },
    });

    productTableManager.setData(data.table);
  } catch (error) {
    AnalyticsApp.toast(error.message, "error");
  }
}

async function loadCustomerAnalytics() {
  try {
    await AnalyticsApp.loadFilterOptions();
    const isId = AnalyticsApp.getLang() === "id";
    const segSelect = document.getElementById("customerSegmentFilter");

    if (!customerTableManager) {
      customerTableManager = AnalyticsApp.createTableManager({
        tableId: "customerTableEl",
        tbodyId: "customerTable",
        searchInputId: "customerTableSearch",
        footerId: "customerTableFooter",
        pageSize: 10,
        emptyCols: 5,
        emptyMessage: () =>
          AnalyticsApp.getLang() === "id"
            ? "Tidak ada data pelanggan RFM untuk filter ini."
            : "No customer RFM records match the current filters.",
        filterPredicate: (row) => {
          const selectedSeg = segSelect?.value || "";
          return !selectedSeg || row.segment === selectedSeg;
        },
        renderRow: (i) => `
          <tr>
            <td><strong>${i.customer_name}</strong></td>
            <td class="num-col">${i.recency} ${AnalyticsApp.getLang() === "id" ? "hari" : "days"}</td>
            <td class="num-col">${AnalyticsApp.number(i.frequency)}</td>
            <td class="num-col"><strong>${AnalyticsApp.currency(i.monetary)}</strong></td>
            <td><span class="segment-tag">${i.segment}</span></td>
          </tr>
        `,
      });

      segSelect?.addEventListener("change", () => {
        customerTableManager.page = 1;
        customerTableManager.render();
      });
    }

    const data = await AnalyticsApp.get("/api/analytics/customers");
    document.getElementById("customerKpis").innerHTML = `
      <article class="kpi-card"><span>${isId ? "Pelanggan Unik" : "Unique Customers"}</span><strong id="custKpiUnique">—</strong><small class="kpi-context">${isId ? "Akun pembeli aktif" : "Active purchasing accounts"}</small></article>
      <article class="kpi-card"><span>${isId ? "Rata-rata Belanja Akun" : "Avg. Account Spend"}</span><strong id="custKpiAvg">—</strong><small class="kpi-context">${isId ? "Nilai transaksi per pelanggan" : "Lifetime value in scope"}</small></article>
      <article class="kpi-card"><span>${isId ? "Kohort RFM" : "RFM Cohorts"}</span><strong id="custKpiSegs">—</strong><small class="kpi-context">${isId ? "Klasifikasi perilaku" : "Behavioral classifications"}</small></article>
      <article class="kpi-card"><span>${isId ? "Pelanggan Teratas" : "Top Account"}</span><strong>${data.ranking?.[0]?.customer_name || "—"}</strong><small class="kpi-context">${data.ranking?.[0] ? AnalyticsApp.currency(data.ranking[0].revenue) : isId ? "Pendapatan tertinggi" : "Highest revenue"}</small></article>
    `;

    AnalyticsApp.animateValue("custKpiUnique", data.summary?.unique_customers || 0, AnalyticsApp.number);
    AnalyticsApp.animateValue("custKpiAvg", data.summary?.average_spending || 0, AnalyticsApp.currency);
    AnalyticsApp.animateValue("custKpiSegs", Object.keys(data.segments || {}).length, AnalyticsApp.number);

    const segmentLabels = Object.keys(data.segments || {});
    if (segSelect) {
      const currentSeg = segSelect.value;
      segSelect.innerHTML =
        `<option value="">${isId ? "Semua segmen" : "All segments"}</option>` +
        segmentLabels.map((s) => `<option value="${s}">${s}</option>`).join("");
      segSelect.value = currentSeg;
    }

    AnalyticsApp.chart("segmentChart", {
      type: "doughnut",
      data: {
        labels: segmentLabels,
        datasets: [
          {
            data: Object.values(data.segments || {}),
            backgroundColor: ["#315F50", "#5E8576", "#8BA99A", "#C28A3E", "#777B75", "#B85C50"],
            borderWidth: 3,
            borderColor: AnalyticsApp.getTheme() === "dark" ? "#171B20" : "#FFFFFF",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "66%",
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10.5 } } },
        },
      },
    });

    AnalyticsApp.chart("customerChart", {
      type: "bar",
      data: {
        labels: (data.ranking || []).slice(0, 8).map((i) => i.customer_name),
        datasets: [
          {
            label: isId ? "Pendapatan" : "Revenue",
            data: (data.ranking || []).slice(0, 8).map((i) => i.revenue),
            backgroundColor: "#8BA99A",
            hoverBackgroundColor: "#315F50",
            borderRadius: 4,
            barThickness: 16,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y",
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (c) => `${isId ? "Nilai Belanja" : "Account Spend"}: ${AnalyticsApp.currency(c.parsed.x)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: "#EEEEE7" },
            border: { display: false },
            ticks: {
              callback: (v) => AnalyticsApp.compactCurrency(v),
              font: { family: "IBM Plex Mono", size: 10 },
            },
          },
          y: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 11 } } },
        },
      },
    });

    customerTableManager.setData(data.table || []);
  } catch (error) {
    AnalyticsApp.toast(error.message, "error");
  }
}

async function loadRegionAnalytics() {
  try {
    await AnalyticsApp.loadFilterOptions();
    const isId = AnalyticsApp.getLang() === "id";

    if (!regionTableManager) {
      regionTableManager = AnalyticsApp.createTableManager({
        tableId: "regionTableEl",
        tbodyId: "regionTable",
        searchInputId: "regionTableSearch",
        footerId: "regionTableFooter",
        pageSize: 10,
        emptyCols: 6,
        emptyMessage: () =>
          AnalyticsApp.getLang() === "id"
            ? "Tidak ada data wilayah yang cocok dengan filter."
            : "No regional data matches the active filter.",
        renderRow: (i) => `
          <tr>
            <td><strong>${i.region}</strong></td>
            <td class="num-col">${AnalyticsApp.number(i.orders)}</td>
            <td class="num-col">${AnalyticsApp.number(i.units)}</td>
            <td class="num-col"><strong>${AnalyticsApp.currency(i.revenue)}</strong></td>
            <td class="num-col">${AnalyticsApp.currency(i.profit)}</td>
            <td class="num-col"><span class="variance-pill pos">${i.margin.toFixed(1)}%</span></td>
          </tr>
        `,
      });
    }

    const data = await AnalyticsApp.get("/api/analytics/regions");
    const enrichedRegions = (data.table || []).map((r) => ({
      ...r,
      margin: r.revenue ? Number(((r.profit / r.revenue) * 100).toFixed(2)) : 0,
    }));

    const combinedProfit = enrichedRegions.reduce((sum, i) => sum + i.profit, 0);

    document.getElementById("regionKpis").innerHTML = `
      <article class="kpi-card"><span>${isId ? "Wilayah Teratas" : "Leading Territory"}</span><strong>${data.top?.region || "—"}</strong><small class="kpi-context">${AnalyticsApp.currency(data.top?.revenue)} ${isId ? "pendapatan bersih" : "net revenue"}</small></article>
      <article class="kpi-card"><span>${isId ? "Wilayah Berkembang" : "Developing Territory"}</span><strong>${data.bottom?.region || "—"}</strong><small class="kpi-context">${AnalyticsApp.currency(data.bottom?.revenue)} ${isId ? "pendapatan bersih" : "net revenue"}</small></article>
      <article class="kpi-card"><span>${isId ? "Wilayah Aktif" : "Active Territories"}</span><strong id="regKpiCount">—</strong><small class="kpi-context">${isId ? "Tercakup dalam filter" : "Represented in selection"}</small></article>
      <article class="kpi-card"><span>${isId ? "Total Laba Wilayah" : "Combined Territory Profit"}</span><strong id="regKpiProfit">—</strong><small class="kpi-context">${isId ? "Surplus bersih operasional" : "Net operating surplus"}</small></article>
    `;

    AnalyticsApp.animateValue("regKpiCount", enrichedRegions.length, AnalyticsApp.number);
    AnalyticsApp.animateValue("regKpiProfit", combinedProfit, AnalyticsApp.currency);

    AnalyticsApp.chart("regionComparisonChart", {
      type: "bar",
      data: {
        labels: enrichedRegions.map((i) => i.region),
        datasets: [
          {
            label: isId ? "Pendapatan Bersih" : "Net Revenue",
            data: enrichedRegions.map((i) => i.revenue),
            backgroundColor: "#315F50",
            borderRadius: 4,
            barPercentage: 0.65,
          },
          {
            label: isId ? "Laba Bersih" : "Net Profit",
            data: enrichedRegions.map((i) => i.profit),
            backgroundColor: "#8BA99A",
            borderRadius: 4,
            barPercentage: 0.65,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", align: "end", labels: { boxWidth: 10, font: { size: 11 } } },
          tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${AnalyticsApp.currency(c.parsed.y)}` } },
        },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: {
            grid: { color: "#EEEEE7" },
            border: { display: false },
            ticks: {
              callback: (v) => AnalyticsApp.compactCurrency(v),
              font: { family: "IBM Plex Mono", size: 10.5 },
            },
          },
        },
      },
    });

    regionTableManager.setData(enrichedRegions);
  } catch (error) {
    AnalyticsApp.toast(error.message, "error");
  }
}
