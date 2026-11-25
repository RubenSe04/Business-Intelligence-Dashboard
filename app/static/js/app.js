window.App = (() => {
  const I18N = {
    id: {
      "brand.tag": "Inteligensi Editorial",
      "nav.workspace": "Ruang Kerja",
      "nav.operations": "Operasional",
      "nav.overview": "Ringkasan",
      "nav.sales": "Analitik Penjualan",
      "nav.products": "Analitik Produk",
      "nav.customers": "Analitik Pelanggan",
      "nav.regions": "Analitik Wilayah",
      "nav.reports": "Laporan",
      "nav.data": "Manajemen Data",
      "nav.settings": "Pengaturan",
      "header.synced": "Tersinkron",
      "header.caseId": "Kasus ID",
      "header.caseGlobal": "Global",
      "notif.title": "Notifikasi Analitik",
      "notif.subtitle": "Sinyal data & pembaruan otomatis",
      "notif.markRead": "Tandai dibaca",
      "notif.item1.title": "Basis data analitik terverifikasi",
      "notif.item1.desc": "Transaksi selesai telah lulus rekonsiliasi pendapatan bersih dan margin laba.",
      "notif.item1.time": "Baru saja",
      "notif.item2.title": "Segmentasi RFM diperbarui",
      "notif.item2.desc": "Kuartil Recency, Frequency, dan Monetary pelanggan dihitung ulang dari data aktif.",
      "notif.item3.title": "Mesin ekspor siap digunakan",
      "notif.item3.desc": "Generator CSV, buku kerja Excel, dan PDF Eksekutif siap diunduh.",
      "notif.item3.time": "Hari ini",
      "profile.editSettings": "Ubah Profil & Pengaturan",
      "filter.scopeTag": "Cakupan Analisis",
      "filter.allPeriods": "Semua periode tersedia",
      "filter.presetAll": "Semua Waktu",
      "filter.from": "Dari Tanggal",
      "filter.to": "Sampai Tanggal",
      "filter.region": "Wilayah",
      "filter.category": "Kategori",
      "filter.product": "Produk",
      "filter.allRegions": "Semua wilayah",
      "filter.allCategories": "Semua kategori",
      "filter.allProducts": "Semua produk",
      "filter.reset": "Reset",
      "filter.activeConstraints": "Filter aktif:",
      "modal.cancel": "Batal",
      "overview.eyebrow": "Ruang Kerja Eksekutif · Buku Besar Komersial",
      "overview.title": "Ringkasan Eksekutif",
      "overview.desc": "Dapatkan gambaran menyeluruh performa bisnis Anda mulai dari laju pendapatan, bauran produk, margin wilayah, hingga arus transaksi.",
      "overview.customReport": "Laporan Kustom",
      "overview.exportBtn": "Ekspor laporan",
      "overview.totalNetRevenue": "Total Pendapatan Bersih",
      "overview.accountingBasis": "Basis Akuntansi",
      "overview.netOfDiscounts": "Bersih Setelah Diskon",
      "overview.activeScope": "Cakupan Aktif",
      "overview.realizedProfit": "Laba Bersih Terealisasi",
      "overview.periodTrajectory": "Trajektori periode",
      "overview.temporalEyebrow": "Performa Waktu",
      "overview.revenueProfitTrajectory": "Tren Pendapatan & Laba",
      "overview.portfolioMix": "Komposisi Portofolio",
      "overview.salesByCategory": "Penjualan per Kategori",
      "overview.leaderboard": "Peringkat Komersial",
      "overview.topProducts": "Produk Performa Terbaik",
      "overview.fullPortfolio": "Lihat semua",
      "overview.geoDist": "Distribusi Geografis",
      "overview.regionalPerformance": "Performa Wilayah",
      "overview.territoryDetail": "Detail wilayah",
      "overview.orderLedger": "Buku Besar Pesanan",
      "overview.recentTransactions": "Transaksi Terbaru",
      "kpi.totalOrders": "Total Pesanan",
      "kpi.totalOrdersSub": "Pesanan unik selesai",
      "kpi.totalProfit": "Total Laba Bersih",
      "kpi.totalProfitSub": "Setelah HPP & ongkos kirim",
      "kpi.aov": "Rata-rata Nilai Pesanan",
      "kpi.aovSub": "Pendapatan bersih per pesanan",
      "kpi.activeCustomers": "Pelanggan Aktif",
      "kpi.activeCustomersSub": "Akun pembeli unik",
      "kpi.unitsSold": "Unit Terjual",
      "kpi.unitsSoldSub": "Total volume barang terkirim",
      "kpi.profitMargin": "Margin Laba",
      "kpi.profitMarginSub": "Rasio laba terhadap pendapatan",
      "insights.eyebrow": "Sintesis Otomatis",
      "insights.title": "Wawasan Bisnis",
      "insights.sub": "Dihitung langsung dari data terpilih",
      "insights.loading": "Menganalisis performa terpilih...",
      "period.daily": "Harian",
      "period.weekly": "Mingguan",
      "period.monthly": "Bulanan",
      "period.yearly": "Tahunan",
      "table.searchProducts": "Cari produk...",
      "table.searchTransactions": "Cari ID pesanan, pelanggan, produk...",
      "table.searchMonth": "Cari bulan (mis. 2025-04)...",
      "table.searchProductCat": "Cari produk atau kategori...",
      "table.searchCustomer": "Cari pelanggan atau segmen...",
      "table.searchRegion": "Cari wilayah...",
      "th.rank": "Peringkat",
      "th.product": "Produk",
      "th.category": "Kategori",
      "th.units": "Unit",
      "th.revenue": "Pendapatan",
      "th.netRevenue": "Pendapatan Bersih",
      "th.netProfit": "Laba Bersih",
      "th.share": "Pangsa",
      "th.orderId": "ID Pesanan",
      "th.date": "Tanggal",
      "th.customer": "Pelanggan",
      "th.region": "Wilayah",
      "th.status": "Status",
      "th.month": "Bulan",
      "th.orders": "Pesanan",
      "th.margin": "Margin Laba",
      "th.momGrowth": "Pertumbuhan MoM",
      "th.recency": "Recency (Hari)",
      "th.frequency": "Frekuensi (Pesanan)",
      "th.monetary": "Nilai Monetary",
      "th.segment": "Segmen RFM",
      "th.datasetName": "Nama Dataset",
      "th.rows": "Baris",
      "th.actions": "Aksi",
      "sales.eyebrow": "Performa Komersial · Laju Pendapatan",
      "sales.title": "Analitik Penjualan",
      "sales.desc": "Evaluasi pergerakan pendapatan dan laba harian, laju pertumbuhan bulanan (MoM), serta margin operasional tiap periode.",
      "sales.exportCsv": "Ekspor CSV",
      "sales.cumRev": "Pendapatan Kumulatif",
      "sales.acrossPeriod": "Sepanjang periode aktif",
      "sales.cumProfit": "Laba Kumulatif",
      "sales.netSurplus": "Surplus bersih operasional",
      "sales.peakMonth": "Pendapatan Bulanan Tertinggi",
      "sales.avgMom": "Rata-rata Pertumbuhan Bulanan",
      "sales.momRate": "Laju MoM rata-rata",
      "sales.timeSeries": "Runtun Waktu",
      "sales.revVsProfit": "Trajektori Pendapatan vs. Laba",
      "sales.dailyRes": "Resolusi Harian",
      "sales.momentum": "Momentum",
      "sales.momGrowth": "Pertumbuhan Bulanan (MoM)",
      "sales.periodLedger": "Buku Besar Periode",
      "sales.monthlyComparison": "Perbandingan Penjualan Bulanan",
      "products.eyebrow": "Performa Portofolio · Ekonomi SKU",
      "products.title": "Analitik Produk",
      "products.desc": "Evaluasi kontribusi pendapatan tingkat SKU, keseimbangan kategori, volume unit terjual, dan efisiensi margin produk.",
      "products.activeSkus": "SKU Aktif",
      "products.withSales": "Memiliki transaksi",
      "products.leadingSku": "Produk Terlaris",
      "products.highestMarginSku": "SKU Margin Tertinggi",
      "products.categoryCount": "Jumlah Kategori",
      "products.activeLines": "Lini produk aktif",
      "products.revContribution": "Kontribusi Pendapatan",
      "products.top8Title": "8 Produk Teratas berdasarkan Pendapatan",
      "products.categoryMix": "Bauran Kategori",
      "products.matrixEyebrow": "Peringkat SKU & Matriks Margin",
      "products.matrixTitle": "Pendapatan dan Profitabilitas per Produk",
      "customers.eyebrow": "Inteligensi Pelanggan · Segmentasi RFM",
      "customers.title": "Analitik Pelanggan",
      "customers.desc": "Analisis konsentrasi akun, frekuensi pembelian, rentang waktu transaksi terakhir (recency), dan distribusi segmen RFM.",
      "customers.cohortDist": "Distribusi Kohort",
      "customers.rfmSegments": "Segmen Pelanggan RFM",
      "customers.concentration": "Konsentrasi Akun",
      "customers.topCustomers": "Pelanggan Teratas berdasarkan Nilai Transaksi",
      "customers.ledgerEyebrow": "Buku Besar Kohort RFM",
      "customers.ledgerTitle": "Peringkat Pelanggan & Klasifikasi Segmen",
      "customers.allSegments": "Semua segmen",
      "regions.eyebrow": "Performa Teritorial · Hasil Geografis",
      "regions.title": "Analitik Wilayah",
      "regions.desc": "Bandingkan pendapatan bersih, laba operasional, kepadatan pesanan, dan kontribusi margin di seluruh wilayah penjualan.",
      "regions.compEyebrow": "Perbandingan Wilayah",
      "regions.compTitle": "Pendapatan vs. Profitabilitas per Wilayah",
      "regions.compBadge": "Analisis Komparatif",
      "regions.ledgerEyebrow": "Buku Besar Wilayah",
      "regions.ledgerTitle": "Rincian Performa Wilayah",
      "reports.eyebrow": "Output Siap Keputusan · Mesin Ekspor",
      "reports.title": "Laporan",
      "reports.desc": "Konfigurasikan rentang tanggal dan filter wilayah/kategori untuk mengunduh laporan CSV, buku kerja Excel, atau ringkasan PDF eksekutif.",
      "reports.step1": "1 · Konfigurasi Parameter",
      "reports.defineScope": "Tentukan Cakupan Laporan",
      "reports.matchingOrders": "Pesanan Sesuai",
      "reports.scopedRevenue": "Pendapatan Bersih",
      "reports.scopedProfit": "Laba Bersih",
      "reports.operatingMargin": "Margin Operasional",
      "reports.step2": "2 · Format Dokumen",
      "reports.generateDownload": "Buat & Unduh",
      "reports.csvTitle": "Data Analitik CSV",
      "reports.csvDesc": "Baris transaksi mentah siap untuk diolah di Python, R, atau SQL.",
      "reports.excelTitle": "Buku Kerja Excel",
      "reports.excelDesc": "Spreadsheet terformat dengan kolom terstruktur untuk pemodelan keuangan.",
      "reports.pdfTitle": "Ringkasan Eksekutif PDF",
      "reports.pdfDesc": "Dokumen siap rapat berisi KPI utama dan daftar transaksi teratas.",
      "data.eyebrow": "Administrasi Sumber Data · Pipeline Ingesti",
      "data.title": "Manajemen Data",
      "data.desc": "Unggah, validasi, pratinjau, atau beralih antar dataset sampel kasus Indonesia (Rupiah) dan Global (USD).",
      "data.useIndonesiaBtn": "Gunakan Kasus Indonesia (IDR)",
      "data.useGlobalBtn": "Dataset Global (USD)",
      "data.uploadBtn": "Unggah dataset",
      "data.workflowEyebrow": "Alur Impor",
      "data.validationTitle": "Validasi Skema & Kualitas Data",
      "data.reqFields": "16 Kolom Wajib",
      "data.dropTitle": "Pilih atau Tarik File Dataset Transaksi",
      "data.dropDesc": "Mendukung file CSV dan Excel (.xlsx, .xls) berisi kolom pesanan, pelanggan, produk, dan biaya.",
      "data.browseBtn": "Pilih file lokal",
      "data.historyEyebrow": "Riwayat Repositori",
      "data.availableDatasets": "Dataset Tersedia",
      "data.previewEyebrow": "Inspeksi Rekaman Sumber",
      "data.previewTitle": "Pratinjau Dataset",
      "data.awaiting": "Menunggu pilihan",
      "data.previewEmpty": "Unggah file atau klik ikon mata (pratinjau) pada dataset yang tersedia untuk melihat contoh baris data.",
      "settings.eyebrow": "Konfigurasi Ruang Kerja · Preferensi Pengguna",
      "settings.title": "Pengaturan",
      "settings.desc": "Sesuaikan identitas profil Anda, tema tampilan (Terang / Gelap), bahasa antarmuka, serta dataset sampel kasus Indonesia (Rupiah) atau Global (USD).",
      "settings.profileEyebrow": "Identitas Pengguna",
      "settings.profileTitle": "Profil Analis",
      "settings.profileDesc": "Perbarui nama tampilan, jabatan, dan email yang ditampilkan pada sidebar dan header ruang kerja NexusBI.",
      "settings.fullName": "Nama Lengkap",
      "settings.roleTitle": "Jabatan / Peran",
      "settings.emailAddr": "Alamat Email",
      "settings.saveProfile": "Simpan Profil",
      "settings.interfaceEyebrow": "Antarmuka & Aksesibilitas",
      "settings.displayTitle": "Tema, Bahasa & Tampilan",
      "settings.themeLabel": "Tema Tampilan (Light / Dark Mode)",
      "settings.themeSub": "Beralih antara tema terang editorial dan tema gelap berkinerja tinggi.",
      "settings.light": "Terang",
      "settings.dark": "Gelap",
      "settings.langLabel": "Bahasa Antarmuka (Language)",
      "settings.langSub": "Gunakan Bahasa Indonesia atau Bahasa Inggris di seluruh halaman.",
      "settings.reduceMotion": "Kurangi Animasi & Transisi",
      "settings.reduceMotionSub": "Matikan animasi hitung angka KPI dan grafik masuk.",
      "settings.compactNav": "Sidebar Navigasi Ringkas",
      "settings.compactNavSub": "Ciutkan sidebar kiri menjadi bilah ikon dengan tooltip instan.",
      "settings.dataSourceEyebrow": "Siklus Sumber Data & Mata Uang",
      "settings.demoDatasetTitle": "Pilihan Dataset Sampel (Kasus Indonesia IDR vs Global USD)",
      "settings.demoDesc": "Pilih skenario dataset bawaan untuk melihat simulasi analitik menggunakan mata uang Rupiah (IDR) dengan perusahaan, produk, dan wilayah Indonesia, atau kembalikan ke dataset Global (USD) kapan saja.",
      "settings.idPresetTitle": "Kasus Bisnis Indonesia (Rupiah / IDR)",
      "settings.idPresetDesc": "1.200 transaksi B2B korporat Indonesia (PT/CV Nusantara, wilayah Jabodetabek, Jawa, Sumatera, Kalimantan, Sulawesi, Bali) periode Jan 2024 – Des 2025 dalam mata uang Rupiah.",
      "settings.activateIndonesia": "Aktifkan Dataset Indonesia (IDR)",
      "settings.globalPresetTitle": "Dataset Sebelumnya · Global Enterprise (USD)",
      "settings.globalPresetDesc": "1.200 transaksi internasional (North America, Europe, Asia Pacific, Latin America, Middle East) periode Jan 2024 – Des 2025 menggunakan mata uang Dolar AS (USD).",
      "settings.activateGlobal": "Gunakan Dataset Global Sebelumnya (USD)",
    },
    en: {
      "brand.tag": "Editorial Intelligence",
      "nav.workspace": "Workspace",
      "nav.operations": "Operations",
      "nav.overview": "Overview",
      "nav.sales": "Sales Analytics",
      "nav.products": "Product Analytics",
      "nav.customers": "Customer Analytics",
      "nav.regions": "Regional Analytics",
      "nav.reports": "Reports",
      "nav.data": "Data Management",
      "nav.settings": "Settings",
      "header.synced": "Synced",
      "header.caseId": "ID Case",
      "header.caseGlobal": "Global",
      "notif.title": "Analytical Feed",
      "notif.subtitle": "Automated data & pipeline signals",
      "notif.markRead": "Mark read",
      "notif.item1.title": "Analytical store verified",
      "notif.item1.desc": "Completed transaction ledger passed integrity and margin reconciliation checks.",
      "notif.item1.time": "Just now",
      "notif.item2.title": "RFM segmentation updated",
      "notif.item2.desc": "Customer recency, frequency, and monetary quartiles recalculated from live orders.",
      "notif.item3.title": "Export engine ready",
      "notif.item3.desc": "CSV, Excel workbook, and Executive PDF generators online.",
      "notif.item3.time": "Today",
      "profile.editSettings": "Edit Profile & Preferences",
      "filter.scopeTag": "Analytical Scope",
      "filter.allPeriods": "All available periods",
      "filter.presetAll": "All Time",
      "filter.from": "From Date",
      "filter.to": "To Date",
      "filter.region": "Region",
      "filter.category": "Category",
      "filter.product": "Product",
      "filter.allRegions": "All regions",
      "filter.allCategories": "All categories",
      "filter.allProducts": "All products",
      "filter.reset": "Reset",
      "filter.activeConstraints": "Active constraints:",
      "modal.cancel": "Cancel",
      "overview.eyebrow": "Executive Workspace · Commercial Ledger",
      "overview.title": "Overview",
      "overview.desc": "Get a clear picture of your business performance across revenue velocity, product mix, regional margins, and transaction flow.",
      "overview.customReport": "Custom Report",
      "overview.exportBtn": "Export report",
      "overview.totalNetRevenue": "Total Net Revenue",
      "overview.accountingBasis": "Accounting Basis",
      "overview.netOfDiscounts": "Net of Discounts",
      "overview.activeScope": "Active Scope",
      "overview.realizedProfit": "Net Profit Realized",
      "overview.periodTrajectory": "Period trajectory",
      "overview.temporalEyebrow": "Temporal Performance",
      "overview.revenueProfitTrajectory": "Revenue & Profit Trajectory",
      "overview.portfolioMix": "Portfolio Composition",
      "overview.salesByCategory": "Sales by Category",
      "overview.leaderboard": "Commercial Leaderboard",
      "overview.topProducts": "Top Performing Products",
      "overview.fullPortfolio": "Full portfolio",
      "overview.geoDist": "Geographic Distribution",
      "overview.regionalPerformance": "Regional Performance",
      "overview.territoryDetail": "Territory detail",
      "overview.orderLedger": "Order Ledger",
      "overview.recentTransactions": "Recent Transactions",
      "kpi.totalOrders": "Total Orders",
      "kpi.totalOrdersSub": "Distinct completed orders",
      "kpi.totalProfit": "Total Profit",
      "kpi.totalProfitSub": "After COGS & shipping",
      "kpi.aov": "Average Order Value",
      "kpi.aovSub": "Net revenue per order",
      "kpi.activeCustomers": "Active Customers",
      "kpi.activeCustomersSub": "Unique purchasing accounts",
      "kpi.unitsSold": "Units Sold",
      "kpi.unitsSoldSub": "Total item volume shipped",
      "kpi.profitMargin": "Profit Margin",
      "kpi.profitMarginSub": "Net operating return ratio",
      "insights.eyebrow": "Automated Synthesis",
      "insights.title": "Business Insights",
      "insights.sub": "Derived live from active selection",
      "insights.loading": "Analyzing selected performance...",
      "period.daily": "Daily",
      "period.weekly": "Weekly",
      "period.monthly": "Monthly",
      "period.yearly": "Yearly",
      "table.searchProducts": "Filter products...",
      "table.searchTransactions": "Search order, customer, product...",
      "table.searchMonth": "Search month (e.g. 2025-04)...",
      "table.searchProductCat": "Search product or category...",
      "table.searchCustomer": "Search customer or segment...",
      "table.searchRegion": "Search territory...",
      "th.rank": "Rank",
      "th.product": "Product",
      "th.category": "Category",
      "th.units": "Units",
      "th.revenue": "Revenue",
      "th.netRevenue": "Net Revenue",
      "th.netProfit": "Net Profit",
      "th.share": "Share",
      "th.orderId": "Order ID",
      "th.date": "Date",
      "th.customer": "Customer",
      "th.region": "Region",
      "th.status": "Status",
      "th.month": "Month",
      "th.orders": "Orders",
      "th.margin": "Profit Margin",
      "th.momGrowth": "MoM Growth",
      "th.recency": "Recency (Days)",
      "th.frequency": "Frequency (Orders)",
      "th.monetary": "Monetary Value",
      "th.segment": "RFM Segment",
      "th.datasetName": "Dataset Name",
      "th.rows": "Rows",
      "th.actions": "Actions",
      "sales.eyebrow": "Commercial Performance · Revenue Velocity",
      "sales.title": "Sales Analytics",
      "sales.desc": "Examine daily revenue and profit progression, month-over-month expansion rates, and period-level operating margins.",
      "sales.exportCsv": "Export CSV",
      "sales.cumRev": "Cumulative Revenue",
      "sales.acrossPeriod": "Across active period",
      "sales.cumProfit": "Cumulative Profit",
      "sales.netSurplus": "Operating net surplus",
      "sales.peakMonth": "Peak Monthly Revenue",
      "sales.avgMom": "Avg Monthly Growth",
      "sales.momRate": "Compound MoM rate",
      "sales.timeSeries": "Time Series",
      "sales.revVsProfit": "Revenue vs. Profit Trajectory",
      "sales.dailyRes": "Daily Resolution",
      "sales.momentum": "Momentum",
      "sales.momGrowth": "Month-over-Month Growth",
      "sales.periodLedger": "Period Ledger",
      "sales.monthlyComparison": "Monthly Sales Comparison",
      "products.eyebrow": "Portfolio Performance · SKU Economics",
      "products.title": "Product Analytics",
      "products.desc": "Evaluate SKU-level revenue contribution, category balance, unit velocity, and unit margin efficiency across your catalog.",
      "products.activeSkus": "Active SKUs",
      "products.withSales": "With recorded sales",
      "products.leadingSku": "Leading SKU",
      "products.highestMarginSku": "Highest Margin SKU",
      "products.categoryCount": "Category Count",
      "products.activeLines": "Active product lines",
      "products.revContribution": "Revenue Contribution",
      "products.top8Title": "Top 8 Products by Revenue",
      "products.categoryMix": "Category Mix",
      "products.matrixEyebrow": "SKU Ranking & Margin Matrix",
      "products.matrixTitle": "Revenue and Profitability by Product",
      "customers.eyebrow": "Customer Intelligence · RFM Segmentation",
      "customers.title": "Customer Analytics",
      "customers.desc": "Analyze account concentration, purchasing frequency, recency decay, and behavioral RFM cohort distribution.",
      "customers.cohortDist": "Cohort Distribution",
      "customers.rfmSegments": "RFM Customer Segments",
      "customers.concentration": "Account Concentration",
      "customers.topCustomers": "Top Customers by Lifetime Value",
      "customers.ledgerEyebrow": "RFM Cohort Ledger",
      "customers.ledgerTitle": "Customer Ranking & Segment Classification",
      "customers.allSegments": "All segments",
      "regions.eyebrow": "Territory Performance · Geographic Yield",
      "regions.title": "Regional Analytics",
      "regions.desc": "Compare net revenue, net operating profit, order density, and margin contribution across global sales territories.",
      "regions.compEyebrow": "Regional Comparison",
      "regions.compTitle": "Revenue vs. Profitability by Territory",
      "regions.compBadge": "Comparative Bar Analysis",
      "regions.ledgerEyebrow": "Territory Ledger",
      "regions.ledgerTitle": "Regional Performance Breakdown",
      "reports.eyebrow": "Decision-Ready Output · Export Engine",
      "reports.title": "Reports",
      "reports.desc": "Configure custom date ranges and dimensional slices to compile audit-ready CSV exports, formatted Excel workbooks, or executive PDF briefings.",
      "reports.step1": "1 · Parameter Configuration",
      "reports.defineScope": "Define Report Scope",
      "reports.matchingOrders": "Matching Orders",
      "reports.scopedRevenue": "Scoped Net Revenue",
      "reports.scopedProfit": "Scoped Net Profit",
      "reports.operatingMargin": "Operating Margin",
      "reports.step2": "2 · Deliverable Format",
      "reports.generateDownload": "Generate & Download",
      "reports.csvTitle": "Raw Analytical CSV",
      "reports.csvDesc": "Granular transaction rows ready for Python, R, or SQL ingestion.",
      "reports.excelTitle": "Formatted Excel Workbook",
      "reports.excelDesc": "Structured spreadsheet with typed columns for financial modeling.",
      "reports.pdfTitle": "Executive PDF Briefing",
      "reports.pdfDesc": "Board-ready summary with headline KPIs and top transaction ledger.",
      "data.eyebrow": "Source Administration · Ingestion Pipeline",
      "data.title": "Data Management",
      "data.desc": "Upload, validate, preview, or switch between the Indonesian Rupiah (IDR) and Global (USD) benchmark datasets.",
      "data.useIndonesiaBtn": "Use Indonesia Case (IDR)",
      "data.useGlobalBtn": "Global Dataset (USD)",
      "data.uploadBtn": "Upload dataset",
      "data.workflowEyebrow": "Import Workflow",
      "data.validationTitle": "Schema & Quality Validation",
      "data.reqFields": "16 Required Fields",
      "data.dropTitle": "Select or Drop a Transactional Dataset",
      "data.dropDesc": "Supports CSV and Excel (.xlsx, .xls) files containing standard order, customer, product, and cost columns.",
      "data.browseBtn": "Browse local files",
      "data.historyEyebrow": "Repository History",
      "data.availableDatasets": "Available Datasets",
      "data.previewEyebrow": "Source Record Inspection",
      "data.previewTitle": "Dataset Preview",
      "data.awaiting": "Awaiting selection",
      "data.previewEmpty": "Upload a file or click preview on an existing dataset to inspect sample records.",
      "settings.eyebrow": "Workspace Configuration · User Preferences",
      "settings.title": "Settings",
      "settings.desc": "Customize your analyst profile, interface theme (Light / Dark), language (Indonesian / English), and benchmark dataset (Indonesia IDR or Global USD).",
      "settings.profileEyebrow": "User Identity",
      "settings.profileTitle": "Analyst Profile",
      "settings.profileDesc": "Update your display name, role title, and email address shown across the NexusBI workspace.",
      "settings.fullName": "Full Name",
      "settings.roleTitle": "Role / Title",
      "settings.emailAddr": "Email Address",
      "settings.saveProfile": "Save Profile",
      "settings.interfaceEyebrow": "Interface & Accessibility",
      "settings.displayTitle": "Theme, Language & Display",
      "settings.themeLabel": "Appearance Theme (Light / Dark Mode)",
      "settings.themeSub": "Switch between the warm editorial light theme and high-contrast dark theme.",
      "settings.light": "Light",
      "settings.dark": "Dark",
      "settings.langLabel": "Interface Language",
      "settings.langSub": "Use Bahasa Indonesia or English across all analytical views.",
      "settings.reduceMotion": "Reduce Motion & Transitions",
      "settings.reduceMotionSub": "Disable KPI number counting, chart entrance animations, and panel movement.",
      "settings.compactNav": "Compact Navigation Rail",
      "settings.compactNavSub": "Collapse the left navigation sidebar into an icon-only rail with instant hover tooltips.",
      "settings.dataSourceEyebrow": "Data Source Lifecycle & Currency",
      "settings.demoDatasetTitle": "Sample Dataset Switcher (Indonesia Case IDR vs Global USD)",
      "settings.demoDesc": "Choose a built-in benchmark scenario to analyze Indonesian corporate transactions in Rupiah (IDR) or switch back to the Global (USD) dataset anytime.",
      "settings.idPresetTitle": "Indonesian Business Case (Rupiah / IDR)",
      "settings.idPresetDesc": "1,200 Indonesian B2B corporate transactions (PT/CV Nusantara across Jabodetabek, Java, Sumatra, Kalimantan, Sulawesi, Bali) from Jan 2024 – Dec 2025 in IDR.",
      "settings.activateIndonesia": "Activate Indonesia Dataset (IDR)",
      "settings.globalPresetTitle": "Previous Dataset · Global Enterprise (USD)",
      "settings.globalPresetDesc": "1,200 international transactions (North America, Europe, Asia Pacific, Latin America, Middle East) from Jan 2024 – Dec 2025 in US Dollars (USD).",
      "settings.activateGlobal": "Use Previous Global Dataset (USD)",
    },
  };

  const state = {
    charts: {},
    kpiValues: {},
    tables: {},
    lang: localStorage.getItem("nexusLang") || "id",
    theme: localStorage.getItem("nexusTheme") || "light",
    currencyCode: localStorage.getItem("nexusCurrency") || "IDR",
    activePreset: localStorage.getItem("nexusPreset") || "indonesia",
  };

  function getLang() {
    return state.lang === "en" ? "en" : "id";
  }

  function t(key, fallback = "") {
    const dict = I18N[getLang()] || I18N.id;
    return dict[key] !== undefined ? dict[key] : fallback || key;
  }

  function getTheme() {
    return state.theme === "dark" ? "dark" : "light";
  }

  function isReducedMotion() {
    return (
      localStorage.getItem("reduceMotion") === "true" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function getProfile() {
    return {
      name: localStorage.getItem("nexusProfileName") || "Ruben Setiaji",
      role: localStorage.getItem("nexusProfileRole") || "Lead BI Architect",
      email: localStorage.getItem("nexusProfileEmail") || "ruben.setiaji@nexusbi.id",
    };
  }

  function computeInitials(name) {
    const parts = String(name || "Ruben Setiaji")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return "RS";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function applyProfile() {
    const profile = getProfile();
    const initials = computeInitials(profile.name);
    document.querySelectorAll(".user-profile-name").forEach((el) => {
      el.textContent = profile.name;
    });
    document.querySelectorAll(".user-profile-short").forEach((el) => {
      el.textContent = profile.name;
    });
    document.querySelectorAll(".user-profile-role").forEach((el) => {
      el.textContent = profile.role;
    });
    document.querySelectorAll(".user-profile-email").forEach((el) => {
      el.textContent = profile.email;
    });
    document.querySelectorAll(".user-avatar-initials").forEach((el) => {
      el.textContent = initials;
    });
    const sidebarProfileBtn = document.getElementById("sidebarProfileBtn");
    if (sidebarProfileBtn) {
      sidebarProfileBtn.setAttribute("data-tooltip", `${profile.name} · ${profile.role}`);
    }
  }

  function setProfile({ name, role, email }) {
    if (name && name.trim()) localStorage.setItem("nexusProfileName", name.trim());
    if (role && role.trim()) localStorage.setItem("nexusProfileRole", role.trim());
    if (email && email.trim()) localStorage.setItem("nexusProfileEmail", email.trim());
    applyProfile();
  }

  function applyTheme(newTheme, notify = false) {
    state.theme = newTheme === "dark" ? "dark" : "light";
    localStorage.setItem("nexusTheme", state.theme);
    const isDark = state.theme === "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    document.body.classList.toggle("dark-theme", isDark);

    const icon = document.getElementById("themeToggleIcon");
    if (icon) {
      icon.className = isDark ? "bi bi-sun" : "bi bi-moon-stars";
    }

    document.querySelectorAll("#themeSegmented button[data-theme-val]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.themeVal === state.theme);
    });

    if (window.Chart) {
      const tickColor = isDark ? "#98A09A" : "#777B75";
      const gridColor = isDark ? "#252B32" : "#EEEEE7";
      Chart.defaults.color = tickColor;
      Object.values(state.charts).forEach((chartInstance) => {
        if (!chartInstance) return;
        const scales = chartInstance.options?.scales || {};
        Object.values(scales).forEach((scale) => {
          if (scale.ticks) scale.ticks.color = tickColor;
          if (scale.grid && scale.grid.display !== false) scale.grid.color = gridColor;
        });
        chartInstance.update("none");
      });
    }

    if (notify) {
      toast(
        getLang() === "id"
          ? isDark
            ? "Tema Gelap (Dark Mode) diaktifkan."
            : "Tema Terang (Light Mode) diaktifkan."
          : isDark
          ? "Dark theme enabled."
          : "Light theme enabled."
      );
    }
  }

  function applyLanguage(newLang, notify = false) {
    state.lang = newLang === "en" ? "en" : "id";
    localStorage.setItem("nexusLang", state.lang);
    document.documentElement.setAttribute("lang", state.lang);

    const badge = document.getElementById("langBadgeCode");
    if (badge) badge.textContent = state.lang.toUpperCase();

    document.querySelectorAll("#langSegmented button[data-lang-val]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.langVal === state.lang);
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translated = t(key, el.textContent);
      if (translated) el.textContent = translated;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const translated = t(key, el.getAttribute("placeholder"));
      if (translated) el.setAttribute("placeholder", translated);
    });

    // Update sidebar tooltips
    const navTooltips = {
      "/": t("nav.overview"),
      "/sales": t("nav.sales"),
      "/products": t("nav.products"),
      "/customers": t("nav.customers"),
      "/regions": t("nav.regions"),
      "/reports": t("nav.reports"),
      "/data": t("nav.data"),
      "/settings": t("nav.settings"),
    };
    document.querySelectorAll(".nav-item[data-path]").forEach((el) => {
      const label = navTooltips[el.dataset.path];
      if (label) el.setAttribute("data-tooltip", label);
    });

    updateCurrencyBadgeUI();
    updateFilterUI();

    // Re-render active tables and views so dynamic strings translate immediately
    Object.values(state.tables).forEach((mgr) => mgr && mgr.render && mgr.render());
    window.dispatchEvent(new CustomEvent("nexuslangchange"));

    if (notify) {
      toast(
        state.lang === "id"
          ? "Bahasa diubah ke Bahasa Indonesia."
          : "Language switched to English."
      );
    }
  }

  function setCurrency(code, preset = null) {
    state.currencyCode = String(code || "IDR").toUpperCase() === "USD" ? "USD" : "IDR";
    localStorage.setItem("nexusCurrency", state.currencyCode);
    if (preset) {
      state.activePreset = preset;
      localStorage.setItem("nexusPreset", preset);
    }
    updateCurrencyBadgeUI();
  }

  function updateCurrencyBadgeUI() {
    const codeBadge = document.getElementById("currencyBadgeCode");
    const labelEl = document.getElementById("datasetQuickLabel");
    if (codeBadge) codeBadge.textContent = state.currencyCode;
    if (labelEl) {
      labelEl.textContent =
        state.currencyCode === "IDR" ? t("header.caseId", "Kasus ID") : t("header.caseGlobal", "Global");
    }

    const idCard = document.getElementById("presetCardIndonesia");
    const glCard = document.getElementById("presetCardGlobal");
    if (idCard && glCard) {
      idCard.classList.toggle("active-preset", state.currencyCode === "IDR");
      glCard.classList.toggle("active-preset", state.currencyCode === "USD");
    }
  }

  function applyPreferences() {
    document.body.classList.toggle("reduce-motion", localStorage.getItem("reduceMotion") === "true");
    document.body.classList.toggle("sidebar-collapsed", localStorage.getItem("sidebarCollapsed") === "true");
    if (window.Chart) {
      Chart.defaults.font.family = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif';
      Chart.defaults.plugins.tooltip.backgroundColor = "#191D22";
      Chart.defaults.plugins.tooltip.titleColor = "#FFFFFF";
      Chart.defaults.plugins.tooltip.bodyColor = "#E7E7DF";
      Chart.defaults.plugins.tooltip.borderColor = "rgba(255,255,255,0.1)";
      Chart.defaults.plugins.tooltip.borderWidth = 1;
      Chart.defaults.plugins.tooltip.padding = 10;
      Chart.defaults.plugins.tooltip.cornerRadius = 6;
    }
    applyTheme(state.theme, false);
    applyProfile();
    applyLanguage(state.lang, false);
  }

  function queryParams(extra = {}) {
    const params = new URLSearchParams();
    const mapping = {
      startDate: "start_date",
      endDate: "end_date",
      regionFilter: "region",
      categoryFilter: "category",
      productFilter: "product",
    };
    Object.entries(mapping).forEach(([id, paramKey]) => {
      const el = document.getElementById(id);
      if (el && el.value) params.set(paramKey, el.value);
    });
    Object.entries(extra).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, value);
      }
    });
    return params.toString();
  }

  async function get(path, extra) {
    const qs = queryParams(extra);
    const separator = path.includes("?") ? "&" : "?";
    const url = qs ? `${path}${separator}${qs}` : path;
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Request failed");
    updateSyncTimestamp();
    return result.data;
  }

  async function post(path, body = null) {
    const opts = { method: "POST" };
    if (body) opts.body = body;
    const response = await fetch(path, opts);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Request failed");
    updateSyncTimestamp();
    return result.data;
  }

  function updateSyncTimestamp() {
    const el = document.getElementById("syncTimestamp");
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  function toast(message, tone = "success") {
    const stack = document.getElementById("toastStack");
    if (!stack) return;
    const item = document.createElement("div");
    item.className = "toast";
    const color = tone === "error" ? "#B85C50" : tone === "warning" ? "#C28A3E" : "#347A59";
    item.style.borderLeft = `4px solid ${color}`;
    item.innerHTML = `<span>${message}</span>`;
    stack.appendChild(item);
    setTimeout(() => {
      item.style.opacity = "0";
      item.style.transform = "translateY(6px)";
      item.style.transition = "opacity 160ms ease, transform 160ms ease";
      setTimeout(() => item.remove(), 170);
    }, 3400);
  }

  function currency(value) {
    const num = Number(value) || 0;
    if (state.currencyCode === "IDR") {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(num);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  }

  function compactCurrency(value) {
    const v = Number(value) || 0;
    const abs = Math.abs(v);
    if (state.currencyCode === "IDR") {
      if (abs >= 1e9) return `Rp ${(v / 1e9).toFixed(1)}M`;
      if (abs >= 1e6) return `Rp ${(v / 1e6).toFixed(0)}jt`;
      if (abs >= 1e3) return `Rp ${(v / 1e3).toFixed(0)}rb`;
      return `Rp ${v}`;
    }
    if (abs >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
    if (abs >= 1e3) return `$${(v / 1e3).toFixed(0)}k`;
    return `$${v}`;
  }

  function number(value) {
    const locale = getLang() === "id" ? "id-ID" : "en-US";
    return new Intl.NumberFormat(locale).format(Math.round(Number(value) || 0));
  }

  function percent(value, decimals = 1) {
    return `${(Number(value) || 0).toFixed(decimals)}%`;
  }

  function animateValue(id, targetValue, formatter = number, duration = 680) {
    const el = typeof id === "string" ? document.getElementById(id) : id;
    if (!el) return;
    const key = el.id || id;
    const numericTarget = Number(targetValue) || 0;

    if (isReducedMotion()) {
      state.kpiValues[key] = numericTarget;
      el.textContent = formatter(numericTarget);
      return;
    }

    const startValue = state.kpiValues[key] !== undefined ? state.kpiValues[key] : 0;
    state.kpiValues[key] = numericTarget;

    if (Math.abs(numericTarget - startValue) < 0.005) {
      el.textContent = formatter(numericTarget);
      return;
    }

    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (numericTarget - startValue) * eased;
      el.textContent = formatter(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatter(numericTarget);
      }
    }
    requestAnimationFrame(tick);
  }

  function destroyChart(id) {
    if (state.charts[id]) {
      state.charts[id].destroy();
      delete state.charts[id];
    }
  }

  function chart(id, config) {
    destroyChart(id);
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    const reduced = isReducedMotion();
    const isDark = getTheme() === "dark";
    const tickColor = isDark ? "#98A09A" : "#777B75";
    const gridColor = isDark ? "#252B32" : "#EEEEE7";

    config.options = config.options || {};
    config.options.animation = reduced
      ? false
      : {
          duration: 620,
          easing: "easeOutQuart",
        };
    if (config.options.scales) {
      Object.values(config.options.scales).forEach((scale) => {
        if (scale.ticks) scale.ticks.color = tickColor;
        if (scale.grid && scale.grid.display !== false) scale.grid.color = gridColor;
      });
    }
    state.charts[id] = new Chart(canvas, config);
    return state.charts[id];
  }

  function confirmDialog({
    eyebrow = "Confirm Operation",
    title = "Are you sure?",
    message = "Please confirm before proceeding.",
    confirmText = "Confirm",
    danger = true,
  }) {
    return new Promise((resolve) => {
      const modal = document.getElementById("confirmModal");
      if (!modal) {
        resolve(window.confirm(message));
        return;
      }
      document.getElementById("confirmModalEyebrow").textContent = eyebrow;
      document.getElementById("confirmModalTitle").textContent = title;
      document.getElementById("confirmModalMessage").textContent = message;
      const acceptBtn = document.getElementById("confirmModalAccept");
      const cancelBtn = document.getElementById("confirmModalCancel");
      const closeBtn = document.getElementById("confirmModalClose");

      acceptBtn.textContent = confirmText;
      acceptBtn.className = danger ? "danger-button" : "primary-button";
      if (cancelBtn) cancelBtn.textContent = t("modal.cancel", "Cancel");

      function cleanup(result) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        acceptBtn.removeEventListener("click", onAccept);
        cancelBtn.removeEventListener("click", onCancel);
        closeBtn.removeEventListener("click", onCancel);
        modal.removeEventListener("click", onBackdrop);
        document.removeEventListener("keydown", onKey);
        resolve(result);
      }

      function onAccept() { cleanup(true); }
      function onCancel() { cleanup(false); }
      function onBackdrop(e) { if (e.target === modal) cleanup(false); }
      function onKey(e) { if (e.key === "Escape") cleanup(false); }

      acceptBtn.addEventListener("click", onAccept);
      cancelBtn.addEventListener("click", onCancel);
      closeBtn.addEventListener("click", onCancel);
      modal.addEventListener("click", onBackdrop);
      document.addEventListener("keydown", onKey);

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      acceptBtn.focus();
    });
  }

  function createTableManager({
    tableId,
    tbodyId,
    searchInputId,
    footerId,
    pageSize = 8,
    renderRow,
    emptyCols = 5,
    emptyMessage = "No records match the current filters.",
    filterPredicate = null,
  }) {
    const manager = {
      rows: [],
      sortKey: null,
      sortDir: "desc",
      searchQuery: "",
      page: 1,
      setData(rows) {
        this.rows = Array.isArray(rows) ? rows.map((r, i) => ({ ...r, _origIndex: i + 1 })) : [];
        this.page = 1;
        this.render();
      },
      render() {
        const tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        const isId = getLang() === "id";
        const q = this.searchQuery.trim().toLowerCase();
        let filtered = this.rows.filter((row) => {
          if (filterPredicate && !filterPredicate(row)) return false;
          if (!q) return true;
          return Object.values(row).some((val) =>
            String(val ?? "").toLowerCase().includes(q)
          );
        });

        if (this.sortKey) {
          const key = this.sortKey;
          const dir = this.sortDir === "asc" ? 1 : -1;
          filtered.sort((a, b) => {
            const va = key === "rank" ? a._origIndex : a[key];
            const vb = key === "rank" ? b._origIndex : b[key];
            if (typeof va === "number" && typeof vb === "number") {
              return (va - vb) * dir;
            }
            return String(va ?? "").localeCompare(String(vb ?? ""), undefined, { numeric: true }) * dir;
          });
        }

        const total = filtered.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        if (this.page > totalPages) this.page = totalPages;
        const startIdx = (this.page - 1) * pageSize;
        const slice = filtered.slice(startIdx, startIdx + pageSize);

        if (!slice.length) {
          const msg = typeof emptyMessage === "function" ? emptyMessage() : emptyMessage;
          tbody.innerHTML = `<tr><td colspan="${emptyCols}"><div class="empty-state compact-empty"><p>${msg}</p></div></td></tr>`;
        } else {
          tbody.innerHTML = slice.map((item, idx) => renderRow(item, startIdx + idx)).join("");
        }

        const footer = footerId ? document.getElementById(footerId) : null;
        if (footer) {
          if (total <= pageSize && !q) {
            footer.innerHTML = isId
              ? `<span>Menampilkan semua <strong>${total}</strong> baris data</span><span>Terurut &amp; terverifikasi</span>`
              : `<span>Showing all <strong>${total}</strong> records</span><span>Sorted &amp; verified</span>`;
          } else {
            const from = total ? startIdx + 1 : 0;
            const to = Math.min(startIdx + pageSize, total);
            let pagesHtml = "";
            for (let p = 1; p <= totalPages; p++) {
              if (totalPages <= 7 || p === 1 || p === totalPages || Math.abs(p - this.page) <= 1) {
                pagesHtml += `<button type="button" class="page-btn ${p === this.page ? "active" : ""}" data-page="${p}">${p}</button>`;
              }
            }
            footer.innerHTML = `
              <span>${
                isId
                  ? `Menampilkan <strong>${from}–${to}</strong> dari <strong>${total}</strong> baris`
                  : `Showing <strong>${from}–${to}</strong> of <strong>${total}</strong> records`
              }</span>
              <div class="pagination-controls">
                <button type="button" class="page-btn" data-page="${this.page - 1}" ${this.page <= 1 ? "disabled" : ""}>${isId ? "Sblm" : "Prev"}</button>
                ${pagesHtml}
                <button type="button" class="page-btn" data-page="${this.page + 1}" ${this.page >= totalPages ? "disabled" : ""}>${isId ? "Lanjut" : "Next"}</button>
              </div>
            `;
            footer.querySelectorAll(".page-btn[data-page]").forEach((btn) => {
              btn.addEventListener("click", () => {
                const targetPage = Number(btn.dataset.page);
                if (targetPage >= 1 && targetPage <= totalPages) {
                  this.page = targetPage;
                  this.render();
                }
              });
            });
          }
        }
      },
    };

    const tableEl = document.getElementById(tableId);
    if (tableEl) {
      tableEl.querySelectorAll("th[data-sort]").forEach((th) => {
        th.addEventListener("click", () => {
          const key = th.dataset.sort;
          if (manager.sortKey === key) {
            manager.sortDir = manager.sortDir === "asc" ? "desc" : "asc";
          } else {
            manager.sortKey = key;
            manager.sortDir = "desc";
          }
          tableEl.querySelectorAll("th[data-sort]").forEach((el) => el.classList.remove("sort-asc", "sort-desc"));
          th.classList.add(manager.sortDir === "asc" ? "sort-asc" : "sort-desc");
          manager.render();
        });
      });
    }

    const searchEl = searchInputId ? document.getElementById(searchInputId) : null;
    if (searchEl) {
      searchEl.addEventListener("input", () => {
        manager.searchQuery = searchEl.value;
        manager.page = 1;
        manager.render();
      });
    }

    state.tables[tbodyId] = manager;
    return manager;
  }

  async function loadFilterOptions() {
    const region = document.getElementById("regionFilter");
    const category = document.getElementById("categoryFilter");
    const product = document.getElementById("productFilter");
    try {
      const data = await get("/api/dashboard/filter-options", {});
      if (data.currency) {
        setCurrency(data.currency, data.active_preset);
      }
      if (!region && !category && !product) return data;
      const populate = (select, items, i18nKey, defaultLabel) => {
        if (!select) return;
        const current = select.value;
        select.innerHTML = `<option value="" data-i18n="${i18nKey}">${t(i18nKey, defaultLabel)}</option>`;
        (items || []).forEach((value) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          select.appendChild(option);
        });
        if ((items || []).includes(current)) {
          select.value = current;
        } else {
          select.value = "";
        }
      };
      populate(region, data.regions, "filter.allRegions", "Semua wilayah");
      populate(category, data.categories, "filter.allCategories", "Semua kategori");
      populate(product, data.products, "filter.allProducts", "Semua produk");
      return data;
    } catch (error) {
      toast(error.message, "error");
      return null;
    }
  }

  async function switchPresetDataset(preset = "indonesia", askConfirmation = true) {
    const isIdLang = getLang() === "id";
    const targetIsId = preset === "indonesia";

    if (askConfirmation) {
      const confirmed = await confirmDialog({
        eyebrow: isIdLang ? "Ganti Skenario Dataset & Mata Uang" : "Switch Benchmark Dataset & Currency",
        title: targetIsId
          ? isIdLang
            ? "Gunakan Dataset Kasus Bisnis Indonesia (Rupiah / IDR)?"
            : "Activate Indonesian Business Case Dataset (IDR)?"
          : isIdLang
          ? "Gunakan Dataset Global Sebelumnya (USD)?"
          : "Switch to Previous Global Enterprise Dataset (USD)?",
        message: targetIsId
          ? isIdLang
            ? "1.200 transaksi B2B perusahaan Indonesia (PT/CV Nusantara di Jabodetabek, Jawa, Sumatera, Kalimantan, Sulawesi & Bali) dengan mata uang Rupiah (Rp) akan dimuat."
            : "1,200 Indonesian B2B corporate transactions denominated in Indonesian Rupiah (IDR) will be loaded."
          : isIdLang
          ? "1.200 transaksi internasional (North America, Europe, Asia Pacific, Latin America, Middle East) dengan mata uang Dolar AS ($) akan dimuat kembali."
          : "1,200 international transactions denominated in US Dollars (USD) will be restored.",
        confirmText: targetIsId
          ? isIdLang
            ? "Aktifkan Kasus Indonesia (IDR)"
            : "Load Indonesia (IDR)"
          : isIdLang
          ? "Aktifkan Dataset Global (USD)"
          : "Load Global (USD)",
        danger: false,
      });
      if (!confirmed) return false;
    }

    try {
      const quickBtn = document.getElementById("datasetQuickSwitchBtn");
      if (quickBtn) quickBtn.style.opacity = "0.6";
      const response = await fetch(`/api/datasets/demo/reload?preset=${encodeURIComponent(preset)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preset }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Switch dataset failed");

      setCurrency(result.data.currency || (targetIsId ? "IDR" : "USD"), result.data.preset || preset);
      // Clear current dropdown filter selections so new regions/categories show cleanly
      ["regionFilter", "categoryFilter", "productFilter"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      await loadFilterOptions();
      updateFilterUI();
      state.kpiValues = {};
      window.dispatchEvent(new CustomEvent("nexusfilters"));
      toast(result.data.message);
      return true;
    } catch (err) {
      toast(err.message, "error");
      return false;
    } finally {
      const quickBtn = document.getElementById("datasetQuickSwitchBtn");
      if (quickBtn) quickBtn.style.opacity = "1";
    }
  }

  function updateFilterUI() {
    const start = document.getElementById("startDate")?.value || "";
    const end = document.getElementById("endDate")?.value || "";
    const region = document.getElementById("regionFilter")?.value || "";
    const category = document.getElementById("categoryFilter")?.value || "";
    const product = document.getElementById("productFilter")?.value || "";

    const period = document.getElementById("periodLabel");
    const parts = [];
    if (start || end) parts.push(`${start || "Awal"} → ${end || "Sekarang"}`);
    if (region) parts.push(region);
    if (category) parts.push(category);
    if (product) parts.push(product);
    if (period) {
      period.textContent = parts.length ? parts.join(" · ") : t("filter.allPeriods", "Semua periode tersedia");
    }

    const bar = document.getElementById("activeFiltersBar");
    const pills = document.getElementById("activeFilterPills");
    if (!bar || !pills) return;

    const activeItems = [];
    if (start) activeItems.push({ id: "startDate", label: `${t("filter.from")}: ${start}` });
    if (end) activeItems.push({ id: "endDate", label: `${t("filter.to")}: ${end}` });
    if (region) activeItems.push({ id: "regionFilter", label: `${t("filter.region")}: ${region}` });
    if (category) activeItems.push({ id: "categoryFilter", label: `${t("filter.category")}: ${category}` });
    if (product) activeItems.push({ id: "productFilter", label: `${t("filter.product")}: ${product}` });

    if (!activeItems.length) {
      bar.hidden = true;
      pills.innerHTML = "";
    } else {
      bar.hidden = false;
      pills.innerHTML = activeItems
        .map(
          (item) =>
            `<span class="filter-pill">${item.label}<button type="button" data-clear="${item.id}" aria-label="Remove ${item.label}"><i class="bi bi-x"></i></button></span>`
        )
        .join("");
      pills.querySelectorAll("button[data-clear]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = document.getElementById(btn.dataset.clear);
          if (target) {
            target.value = "";
            syncPresetChips();
            triggerFilterUpdate();
          }
        });
      });
    }
  }

  function syncPresetChips() {
    const start = document.getElementById("startDate")?.value || "";
    const end = document.getElementById("endDate")?.value || "";
    const presets = {
      all: ["", ""],
      "2025": ["2025-01-01", "2025-12-31"],
      "2024": ["2024-01-01", "2024-12-31"],
      "q4-2025": ["2025-10-01", "2025-12-31"],
      "h2-2025": ["2025-07-01", "2025-12-31"],
    };
    document.querySelectorAll(".preset-chip[data-preset]").forEach((chip) => {
      const [pStart, pEnd] = presets[chip.dataset.preset] || [null, null];
      chip.classList.toggle("active", start === pStart && end === pEnd);
    });
  }

  function triggerFilterUpdate() {
    updateFilterUI();
    const filterBar = document.getElementById("globalFilterBar");
    if (filterBar) {
      filterBar.classList.add("is-filtering");
      setTimeout(() => filterBar.classList.remove("is-filtering"), 350);
    }
    window.dispatchEvent(new CustomEvent("nexusfilters"));
  }

  function bindShell() {
    applyPreferences();

    const path = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll(".nav-item[data-path]").forEach((link) => {
      if (link.dataset.path === path) link.classList.add("active");
    });

    const menu = document.getElementById("menuButton");
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebarBackdrop");
    if (menu) {
      menu.addEventListener("click", () => {
        sidebar.classList.add("open");
        backdrop.classList.add("open");
      });
    }
    if (backdrop) {
      backdrop.addEventListener("click", () => {
        sidebar.classList.remove("open");
        backdrop.classList.remove("open");
      });
    }

    const collapseBtn = document.getElementById("sidebarCollapseBtn");
    if (collapseBtn) {
      collapseBtn.addEventListener("click", () => {
        const collapsed = document.body.classList.toggle("sidebar-collapsed");
        localStorage.setItem("sidebarCollapsed", collapsed ? "true" : "false");
        setTimeout(() => {
          Object.values(state.charts).forEach((c) => c && c.resize && c.resize());
        }, 230);
      });
    }

    // Header Theme Toggle Button
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const nextTheme = getTheme() === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
      });
    }

    // Header Language Toggle Button
    const langBtn = document.getElementById("langToggleBtn");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        const nextLang = getLang() === "id" ? "en" : "id";
        applyLanguage(nextLang, true);
      });
    }

    // Header Quick Dataset / Currency Switcher Button
    const datasetQuickBtn = document.getElementById("datasetQuickSwitchBtn");
    if (datasetQuickBtn) {
      datasetQuickBtn.addEventListener("click", () => {
        const nextPreset = state.currencyCode === "IDR" ? "global" : "indonesia";
        switchPresetDataset(nextPreset, true);
      });
    }

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        collapseBtn?.click();
      }
    });

    const refreshBtn = document.getElementById("refreshDataBtn");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        refreshBtn.classList.add("spinning");
        window.dispatchEvent(new CustomEvent("nexusfilters"));
        setTimeout(() => refreshBtn.classList.remove("spinning"), 650);
      });
    }

    // Dropdown Controllers
    const dropdownPairs = [
      { btnId: "notificationButton", panelId: "notificationDropdown" },
      { btnId: "profileButton", panelId: "profileDropdown" },
      { btnId: "sidebarProfileBtn", panelId: "profileDropdown" },
    ];

    function closeAllDropdowns() {
      document.querySelectorAll(".dropdown-panel.open").forEach((panel) => {
        panel.classList.remove("open");
        panel.setAttribute("aria-hidden", "true");
      });
      dropdownPairs.forEach(({ btnId }) => {
        document.getElementById(btnId)?.setAttribute("aria-expanded", "false");
      });
    }

    dropdownPairs.forEach(({ btnId, panelId }) => {
      const btn = document.getElementById(btnId);
      const panel = document.getElementById(panelId);
      if (!btn || !panel) return;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.contains("open");
        closeAllDropdowns();
        if (!isOpen) {
          panel.classList.add("open");
          panel.setAttribute("aria-hidden", "false");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown-panel")) {
        closeAllDropdowns();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllDropdowns();
    });

    const markRead = document.getElementById("markNotificationsRead");
    if (markRead) {
      markRead.addEventListener("click", () => {
        document.querySelectorAll(".notification-item.unread").forEach((el) => el.classList.remove("unread"));
        document.getElementById("notificationDot")?.classList.add("hidden");
        toast(getLang() === "id" ? "Semua notifikasi ditandai sudah dibaca." : "All analytical alerts marked as read.");
      });
    }
  }

  function bindFilters() {
    ["startDate", "endDate", "regionFilter", "categoryFilter", "productFilter"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("change", () => {
          syncPresetChips();
          triggerFilterUpdate();
        });
      }
    });

    const presets = {
      all: ["", ""],
      "2025": ["2025-01-01", "2025-12-31"],
      "2024": ["2024-01-01", "2024-12-31"],
      "q4-2025": ["2025-10-01", "2025-12-31"],
      "h2-2025": ["2025-07-01", "2025-12-31"],
    };

    document.querySelectorAll(".preset-chip[data-preset]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const [startVal, endVal] = presets[chip.dataset.preset] || ["", ""];
        const startEl = document.getElementById("startDate");
        const endEl = document.getElementById("endDate");
        if (startEl) startEl.value = startVal;
        if (endEl) endEl.value = endVal;
        syncPresetChips();
        triggerFilterUpdate();
      });
    });

    const reset = document.getElementById("resetFilters");
    if (reset) {
      reset.addEventListener("click", () => {
        ["startDate", "endDate", "regionFilter", "categoryFilter", "productFilter"].forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.value = "";
        });
        syncPresetChips();
        triggerFilterUpdate();
        toast(getLang() === "id" ? "Filter direset ke seluruh dataset." : "Analytical filters reset to full dataset.");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindShell();
    bindFilters();
    loadFilterOptions();
  });

  return {
    state,
    t,
    getLang,
    getTheme,
    applyTheme,
    applyLanguage,
    getProfile,
    setProfile,
    setCurrency,
    switchPresetDataset,
    loadFilterOptions,
    get,
    post,
    toast,
    currency,
    compactCurrency,
    number,
    percent,
    animateValue,
    chart,
    destroyChart,
    queryParams,
    confirmDialog,
    createTableManager,
    applyPreferences,
  };
})();
