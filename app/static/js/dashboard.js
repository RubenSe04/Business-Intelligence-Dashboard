const AppApi = window.App;
let dashboardPeriod = "month";
let topProductsManager = null;
let recentTransactionsManager = null;
let currentTotalRevenue = 0;

function initOverviewTables() {
  topProductsManager = AppApi.createTableManager({
    tableId: "topProductsTableEl",
    tbodyId: "topProducts",
    searchInputId: "topProductsSearch",
    pageSize: 6,
    emptyCols: 5,
    emptyMessage: () =>
      AppApi.getLang() === "id"
        ? "Tidak ada data produk untuk filter ini."
        : "No product records match the selected filters.",
    renderRow: (item, idx) => {
      const rank = item._origIndex || idx + 1;
      const share = currentTotalRevenue ? (item.revenue / currentTotalRevenue) * 100 : 0;
      return `
        <tr>
          <td class="num-col"><span class="rank-badge ${rank <= 3 ? "top-rank" : ""}">${rank}</span></td>
          <td><strong>${item.product_name}</strong></td>
          <td class="num-col">${AppApi.number(item.units)}</td>
          <td class="num-col">${AppApi.currency(item.revenue)}</td>
          <td class="num-col">
            <span class="share-bar-cell">
              <span>${share.toFixed(1)}%</span>
              <span class="mini-bar"><i style="width:${Math.min(100, share * 2.4)}%"></i></span>
            </span>
          </td>
        </tr>
      `;
    },
  });

  recentTransactionsManager = AppApi.createTableManager({
    tableId: "recentTransactionsTableEl",
    tbodyId: "recentTransactions",
    searchInputId: "recentSearchInput",
    footerId: "recentTransactionsFooter",
    pageSize: 6,
    emptyCols: 7,
    emptyMessage: () =>
      AppApi.getLang() === "id"
        ? "Tidak ada transaksi yang cocok dengan filter terpilih."
        : "No transactions match the selected filters.",
    renderRow: (item) => `
      <tr>
        <td><strong style="font-family:var(--font-mono)">${item.order_id}</strong></td>
        <td style="font-family:var(--font-mono);color:var(--secondary)">${item.order_date}</td>
        <td><strong>${item.customer_name}</strong></td>
        <td>${item.product_name}</td>
        <td>${item.region}</td>
        <td class="num-col"><strong>${AppApi.currency(item.revenue)}</strong></td>
        <td><span class="status ${String(item.order_status).toLowerCase()}">${item.order_status}</span></td>
      </tr>
    `,
  });
}

async function loadDashboard() {
  try {
    await AppApi.loadFilterOptions();
    const [overview, trend, categories, top, regions, recent] = await Promise.all([
      AppApi.get("/api/dashboard/overview"),
      AppApi.get("/api/dashboard/revenue-trend", { period: dashboardPeriod }),
      AppApi.get("/api/dashboard/categories"),
      AppApi.get("/api/dashboard/top-products"),
      AppApi.get("/api/dashboard/regions"),
      AppApi.get("/api/dashboard/recent"),
    ]);

    const isId = AppApi.getLang() === "id";
    currentTotalRevenue = overview.revenue || 0;

    // Animated KPI count-ups
    AppApi.animateValue("kpiRevenue", overview.revenue, AppApi.currency, 760);
    AppApi.animateValue("kpiOrders", overview.orders, AppApi.number, 640);
    AppApi.animateValue("kpiUnits", overview.units, AppApi.number, 640);
    AppApi.animateValue("kpiCustomers", overview.customers, AppApi.number, 640);
    AppApi.animateValue("kpiProfit", overview.profit, AppApi.currency, 700);
    AppApi.animateValue("kpiAov", overview.aov, AppApi.currency, 660);
    AppApi.animateValue("kpiMargin", overview.profit_margin, (v) => AppApi.percent(v, 1), 660);

    const heroProfitInline = document.getElementById("heroProfitInline");
    if (heroProfitInline) heroProfitInline.textContent = AppApi.currency(overview.profit);

    const growthEl = document.getElementById("kpiGrowth");
    if (growthEl) {
      const sign = overview.growth > 0 ? "+" : "";
      growthEl.innerHTML = `<i class="bi ${overview.growth >= 0 ? "bi-arrow-up-right" : "bi-arrow-down-right"}"></i> ${sign}${overview.growth.toFixed(1)}%`;
      growthEl.classList.toggle("negative", overview.growth < 0);
    }

    const periodMeta = document.getElementById("revenuePeriodMeta");
    if (periodMeta) {
      periodMeta.textContent =
        document.getElementById("periodLabel")?.textContent ||
        (isId ? "Semua periode tersedia" : "All available periods");
    }

    const heroTrendSummary = document.getElementById("heroTrendSummary");
    if (heroTrendSummary && trend.length >= 2) {
      heroTrendSummary.textContent = `${trend[0].period} → ${trend[trend.length - 1].period} (${trend.length} ${isId ? "interval" : "intervals"})`;
    }

    const trendValues = trend.map((item) => item.revenue);
    AppApi.chart("heroTrendChart", {
      type: "line",
      data: {
        labels: trend.map((item) => item.period),
        datasets: [
          {
            data: trendValues,
            borderColor: "#315F50",
            backgroundColor: "rgba(49, 95, 80, 0.08)",
            fill: true,
            tension: 0.36,
            borderWidth: 1.75,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: "#315F50",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (c) => `${isId ? "Pendapatan Bersih" : "Net Revenue"}: ${AppApi.currency(c.parsed.y)}`,
            },
          },
        },
        scales: {
          x: { display: false },
          y: { display: false, beginAtZero: false },
        },
      },
    });

    AppApi.chart("revenueChart", {
      type: "line",
      data: {
        labels: trend.map((item) => item.period),
        datasets: [
          {
            label: isId ? "Pendapatan Bersih" : "Net Revenue",
            data: trend.map((item) => item.revenue),
            borderColor: "#315F50",
            backgroundColor: "rgba(49, 95, 80, 0.065)",
            fill: true,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          {
            label: isId ? "Laba Bersih" : "Net Profit",
            data: trend.map((item) => item.profit),
            borderColor: "#8BA99A",
            backgroundColor: "transparent",
            borderDash: [4, 3],
            fill: false,
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
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, font: { size: 11 } },
          },
          tooltip: {
            callbacks: {
              label: (c) => `${c.dataset.label}: ${AppApi.currency(c.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { maxTicksLimit: 9, font: { size: 10.5 } },
          },
          y: {
            border: { display: false },
            ticks: {
              callback: (v) => AppApi.compactCurrency(v),
              font: { family: "IBM Plex Mono", size: 10.5 },
            },
            grid: { color: "#EEEEE7" },
          },
        },
      },
    });

    const categoryTotal = categories.reduce((sum, item) => sum + item.revenue, 0);
    const catBadge = document.getElementById("categoryCountBadge");
    if (catBadge) catBadge.textContent = `${categories.length} ${isId ? "Kategori" : "Categories"}`;

    const sortedCategories = [...categories].sort((a, b) => b.revenue - a.revenue);
    document.getElementById("categoryBreakdown").innerHTML = sortedCategories.length
      ? sortedCategories
          .slice(0, 6)
          .map((item) => {
            const share = categoryTotal ? (item.revenue / categoryTotal) * 100 : 0;
            return `
              <div class="category-row">
                <div class="category-name">
                  <div class="category-name-head">
                    <strong>${item.category}</strong>
                    <small>${share.toFixed(1)}%</small>
                  </div>
                  <span class="category-share"><i style="width:${share}%"></i></span>
                </div>
                <div class="category-value">${AppApi.currency(item.revenue)}</div>
              </div>
            `;
          })
          .join("")
      : `<div class="empty-state compact-empty"><p>${isId ? "Tidak ada data kategori untuk filter ini." : "No category data for this filter."}</p></div>`;

    if (topProductsManager) topProductsManager.setData(top);
    if (recentTransactionsManager) recentTransactionsManager.setData(recent);

    const sortedRegions = [...regions].sort((a, b) => b.revenue - a.revenue);
    AppApi.chart("regionChart", {
      type: "bar",
      data: {
        labels: sortedRegions.map((item) => item.region),
        datasets: [
          {
            label: isId ? "Pendapatan" : "Revenue",
            data: sortedRegions.map((item) => item.revenue),
            backgroundColor: "#315F50",
            borderRadius: 4,
            barThickness: 15,
          },
          {
            label: isId ? "Laba" : "Profit",
            data: sortedRegions.map((item) => item.profit),
            backgroundColor: "#8BA99A",
            borderRadius: 4,
            barThickness: 15,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y",
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: { boxWidth: 9, font: { size: 10.5 } },
          },
          tooltip: {
            callbacks: {
              label: (c) => `${c.dataset.label}: ${AppApi.currency(c.parsed.x)}`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: "#EEEEE7" },
            border: { display: false },
            ticks: {
              callback: (v) => AppApi.compactCurrency(v),
              font: { family: "IBM Plex Mono", size: 10 },
            },
          },
          y: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { size: 11 } },
          },
        },
      },
    });

    const regionalSummary = document.getElementById("regionalMiniSummary");
    if (regionalSummary) {
      if (sortedRegions.length) {
        const topReg = sortedRegions[0];
        const totalRegRev = sortedRegions.reduce((s, r) => s + r.revenue, 0);
        const topShare = totalRegRev ? ((topReg.revenue / totalRegRev) * 100).toFixed(1) : "0.0";
        regionalSummary.innerHTML = isId
          ? `<span>Wilayah Utama: <strong>${topReg.region}</strong></span><span><strong>${topShare}%</strong> dari total volume</span>`
          : `<span>Primary Territory: <strong>${topReg.region}</strong></span><span><strong>${topShare}%</strong> of total volume</span>`;
      } else {
        regionalSummary.innerHTML = `<span>${isId ? "Tidak ada data wilayah" : "No territory data in scope"}</span>`;
      }
    }

    const insights = [];
    if (overview.revenue > 0) {
      insights.push(
        isId
          ? `
            <div class="insight-item">
              <span class="insight-tag"><i class="bi bi-activity"></i> Sinyal Laju</span>
              <strong>Pendapatan ${overview.growth >= 0 ? "meningkat" : "menurun"} sebesar ${Math.abs(overview.growth).toFixed(1)}% pada paruh kedua periode terpilih</strong>
              <small>Perbandingan antar-paruh periode dari ${AppApi.number(overview.orders)} pesanan selesai</small>
            </div>
          `
          : `
            <div class="insight-item">
              <span class="insight-tag"><i class="bi bi-activity"></i> Velocity Signal</span>
              <strong>Revenue is ${overview.growth >= 0 ? "expanding" : "contracting"} by ${Math.abs(overview.growth).toFixed(1)}% in the second half of the selected period</strong>
              <small>Midpoint period-over-period comparison across ${AppApi.number(overview.orders)} completed orders</small>
            </div>
          `
      );
    }
    if (sortedCategories.length) {
      const leader = sortedCategories[0];
      const share = categoryTotal ? (leader.revenue / categoryTotal) * 100 : 0;
      insights.push(
        isId
          ? `
            <div class="insight-item">
              <span class="insight-tag"><i class="bi bi-layers"></i> Dominasi Kategori</span>
              <strong>${leader.category} memimpin pendapatan portofolio dengan pangsa ${share.toFixed(1)}% (${AppApi.currency(leader.revenue)})</strong>
              <small>Unggul di antara ${sortedCategories.length} kategori produk aktif</small>
            </div>
          `
          : `
            <div class="insight-item">
              <span class="insight-tag"><i class="bi bi-layers"></i> Category Dominance</span>
              <strong>${leader.category} anchors portfolio revenue with ${share.toFixed(1)}% share (${AppApi.currency(leader.revenue)})</strong>
              <small>Leading ${sortedCategories.length} active product categories</small>
            </div>
          `
      );
    }
    if (sortedRegions.length) {
      const marginLeader = [...sortedRegions].sort((a, b) => b.profit / b.revenue - a.profit / a.revenue)[0];
      const margin = marginLeader.revenue ? (marginLeader.profit / marginLeader.revenue) * 100 : 0;
      insights.push(
        isId
          ? `
            <div class="insight-item">
              <span class="insight-tag"><i class="bi bi-compass"></i> Efisiensi Margin</span>
              <strong>${marginLeader.region} menghasilkan efisiensi margin bersih tertinggi sebesar ${margin.toFixed(1)}%</strong>
              <small>Mencetak laba bersih ${AppApi.currency(marginLeader.profit)} dari penjualan ${AppApi.currency(marginLeader.revenue)}</small>
            </div>
          `
          : `
            <div class="insight-item">
              <span class="insight-tag"><i class="bi bi-compass"></i> Yield Efficiency</span>
              <strong>${marginLeader.region} delivers the highest net margin efficiency at ${margin.toFixed(1)}%</strong>
              <small>Realizing ${AppApi.currency(marginLeader.profit)} net profit on ${AppApi.currency(marginLeader.revenue)} sales</small>
            </div>
          `
      );
    }

    document.getElementById("businessInsights").innerHTML = `
      <div class="insight-heading">
        <span class="eyebrow">${AppApi.t("insights.eyebrow")}</span>
        <strong>${AppApi.t("insights.title")}</strong>
        <small>${AppApi.t("insights.sub")}</small>
      </div>
      ${
        insights.length
          ? insights.join("")
          : `<div class="insight-empty">${isId ? "Tidak ada wawasan komparatif untuk filter saat ini." : "No comparative insights available for the current filter selection."}</div>`
      }
    `;
  } catch (error) {
    AppApi.toast(error.message, "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initOverviewTables();
  loadDashboard();

  document.querySelectorAll("#trendPeriod button").forEach((button) =>
    button.addEventListener("click", () => {
      document.querySelectorAll("#trendPeriod button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      dashboardPeriod = button.dataset.period;
      loadDashboard();
    })
  );

  window.addEventListener("nexusfilters", loadDashboard);
  window.addEventListener("nexuslangchange", loadDashboard);

  document.getElementById("exportOverview")?.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const orig = btn.innerHTML;
    const isId = AppApi.getLang() === "id";
    btn.innerHTML = `<i class="bi bi-check2"></i> <span>${isId ? "Menyiapkan Excel..." : "Preparing workbook..."}</span>`;
    AppApi.toast(
      isId
        ? "Menyiapkan laporan Excel terformat untuk tampilan saat ini..."
        : "Generating formatted Excel report for current view..."
    );
    window.location.href = "/api/reports/export/excel?" + AppApi.queryParams();
    setTimeout(() => {
      btn.innerHTML = orig;
    }, 1400);
  });
});
