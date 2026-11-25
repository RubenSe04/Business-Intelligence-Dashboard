const DatasetApp = window.App;
let selectedDatasetId = null;

async function loadDatasets() {
  try {
    await DatasetApp.loadFilterOptions();
    const datasets = await DatasetApp.get("/api/datasets");
    const tbody = document.getElementById("datasetTable");
    if (!tbody) return;
    const isId = DatasetApp.getLang() === "id";
    tbody.innerHTML = datasets.length
      ? datasets
          .map(
            (dataset) => `
          <tr>
            <td>
              <strong>${dataset.dataset_name}</strong><br>
              <small style="color:var(--secondary);font-family:var(--font-mono);font-size:10.5px">${dataset.original_filename}</small>
            </td>
            <td class="num-col">${DatasetApp.number(dataset.total_rows)}</td>
            <td><span class="status ${dataset.dataset_status}">${dataset.dataset_status}</span></td>
            <td class="num-col">
              <div class="dataset-actions-cell">
                <button class="icon-button preview-dataset" data-id="${dataset.id}" data-name="${dataset.dataset_name}" title="${isId ? "Pratinjau dataset" : "Preview dataset records"}" type="button">
                  <i class="bi bi-eye"></i>
                </button>
                <button class="icon-button delete-dataset" data-id="${dataset.id}" data-name="${dataset.dataset_name}" title="${isId ? "Hapus dataset" : "Delete dataset"}" type="button">
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </td>
          </tr>
        `
          )
          .join("")
      : `<tr><td colspan="4"><div class="empty-state compact-empty"><p>${isId ? "Belum ada dataset di repositori." : "No uploaded datasets in repository."}</p></div></td></tr>`;

    document.querySelectorAll(".delete-dataset").forEach((button) =>
      button.addEventListener("click", () => deleteDataset(button.dataset.id, button.dataset.name))
    );
    document.querySelectorAll(".preview-dataset").forEach((button) =>
      button.addEventListener("click", () => previewExistingDataset(button.dataset.id, button.dataset.name))
    );
  } catch (error) {
    DatasetApp.toast(error.message, "error");
  }
}

async function previewExistingDataset(id, name) {
  try {
    const data = await DatasetApp.get(`/api/datasets/preview/${id}`);
    selectedDatasetId = data.dataset_id;
    renderValidationResult(data, name);
    renderPreview(data.preview, name);
  } catch (error) {
    DatasetApp.toast(error.message, "error");
  }
}

async function deleteDataset(id, name) {
  const isId = DatasetApp.getLang() === "id";
  const confirmed = await DatasetApp.confirmDialog({
    eyebrow: isId ? "Operasi Penghapusan" : "Destructive Operation",
    title: isId ? `Hapus "${name || "Dataset"}"?` : `Delete "${name || "Dataset"}"?`,
    message: isId
      ? "Tindakan ini akan menghapus rekaman dataset beserta seluruh transaksi penjualan terkait dari basis data analitik."
      : "This will permanently remove the dataset record and all associated sales transactions from the analytical database.",
    confirmText: isId ? "Hapus dataset" : "Delete dataset",
    danger: true,
  });
  if (!confirmed) return;

  const response = await fetch(`/api/datasets/${id}`, { method: "DELETE" });
  const result = await response.json();
  if (!response.ok) {
    DatasetApp.toast(result.error || "Delete failed", "error");
    return;
  }
  DatasetApp.toast(isId ? "Dataset dan transaksi terkait berhasil dihapus." : "Dataset and associated transactions removed.");
  selectedDatasetId = null;
  loadDatasets();
}

function renderValidationResult(data, labelName = "Selected File") {
  const isId = DatasetApp.getLang() === "id";
  const errors = [];
  if (data.missing_columns?.length)
    errors.push(`${isId ? "Kolom wajib belum ada" : "Missing required columns"}: ${data.missing_columns.join(", ")}`);
  if (data.invalid_records)
    errors.push(`${data.invalid_records} ${isId ? "nilai numerik/tanggal tidak valid" : "invalid numeric or date value(s)"}`);
  if (data.duplicate_rows)
    errors.push(`${data.duplicate_rows} ${isId ? "baris duplikat terdeteksi" : "duplicate row(s) detected"}`);

  document.getElementById("validationPanel").innerHTML = `
    <div style="margin-bottom:12px;display:flex;align-items:center;justify-content:space-between">
      <strong style="font-size:13px">${labelName}</strong>
      <span class="status ${data.valid ? "active" : "cancelled"}">${data.valid ? (isId ? "Skema Valid" : "Schema Valid") : isId ? "Validasi Gagal" : "Validation Failed"}</span>
    </div>
    <div class="validation-metrics">
      <div class="metric-box"><span>${isId ? "Total Baris" : "Total Rows"}</span><strong>${DatasetApp.number(data.total_rows)}</strong></div>
      <div class="metric-box"><span>${isId ? "Total Kolom" : "Total Columns"}</span><strong>${data.total_columns}</strong></div>
      <div class="metric-box"><span>${isId ? "Nilai Kosong" : "Missing Values"}</span><strong>${DatasetApp.number(data.missing_values)}</strong></div>
      <div class="metric-box"><span>${isId ? "Baris Duplikat" : "Duplicate Rows"}</span><strong>${DatasetApp.number(data.duplicate_rows)}</strong></div>
    </div>
    ${errors.length ? `<div class="validation-errors">${errors.join("<br>")}</div>` : ""}
    <div style="display:flex;gap:10px;margin-top:14px">
      ${
        data.valid
          ? `<button class="primary-button" style="flex:1" id="confirmImport" type="button"><i class="bi bi-database-add"></i> ${isId ? "Aktifkan & Impor Dataset" : "Activate & Import Dataset"}</button>`
          : `<button class="primary-button" style="flex:1" disabled type="button">${isId ? "Perbaiki masalah validasi untuk mengimpor" : "Resolve validation issues to import"}</button>`
      }
      <button class="secondary-button" id="selectAnotherFile" type="button">${isId ? "Unggah file lain" : "Upload another"}</button>
    </div>
  `;
  document.getElementById("confirmImport")?.addEventListener("click", importDataset);
  document.getElementById("selectAnotherFile")?.addEventListener("click", () => {
    document.getElementById("datasetFile")?.click();
  });
}

async function uploadFile(file) {
  const isId = DatasetApp.getLang() === "id";
  const form = new FormData();
  form.append("file", file);
  document.getElementById("validationPanel").innerHTML = `
    <div class="empty-state">
      <div class="skeleton-line" style="width:180px;margin-bottom:10px"></div>
      <p>${isId ? "Memproses & memvalidasi" : "Parsing & validating"} <strong>${file.name}</strong>...</p>
    </div>
  `;
  try {
    const response = await fetch("/api/datasets/upload", { method: "POST", body: form });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Upload failed");
    const data = result.data;
    selectedDatasetId = data.dataset_id;
    renderValidationResult(data, file.name);
    renderPreview(data.preview, file.name);
    DatasetApp.toast(isId ? "Dataset berhasil diunggah dan divalidasi." : "Dataset uploaded and validated.");
    loadDatasets();
  } catch (error) {
    document.getElementById("validationPanel").innerHTML = `
      <div class="validation-errors" style="margin-bottom:12px">${error.message}</div>
      <button class="secondary-button" id="retryUploadBtn" type="button">${isId ? "Coba file lain" : "Try another file"}</button>
    `;
    document.getElementById("retryUploadBtn")?.addEventListener("click", () => document.getElementById("datasetFile")?.click());
    DatasetApp.toast(error.message, "error");
  }
}

function renderPreview(rows, name = "Sample") {
  const isId = DatasetApp.getLang() === "id";
  const badge = document.getElementById("previewMetaBadge");
  if (!rows || !rows.length) {
    if (badge) badge.textContent = isId ? "0 baris" : "0 rows";
    document.getElementById("datasetPreview").innerHTML = `<div class="empty-state compact-empty"><p>${isId ? "Tidak ada baris pratinjau." : "No preview rows available."}</p></div>`;
    return;
  }
  if (badge) badge.textContent = `${isId ? "Menampilkan" : "Showing"} ${rows.length} ${isId ? "baris sampel" : "sample rows"} · ${name}`;
  const keys = Object.keys(rows[0]);
  document.getElementById("datasetPreview").innerHTML = `
    <table class="data-table">
      <thead><tr>${keys.map((key) => `<th>${key}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${keys.map((key) => `<td>${row[key] ?? ""}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  `;
}

async function importDataset() {
  if (!selectedDatasetId) return;
  const isId = DatasetApp.getLang() === "id";
  const btn = document.getElementById("confirmImport");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="bi bi-hourglass-split"></i> ${isId ? "Mengimpor transaksi..." : "Importing transactions..."}`;
  }
  const response = await fetch(`/api/datasets/import/${selectedDatasetId}`, { method: "POST" });
  const result = await response.json();
  if (!response.ok) {
    DatasetApp.toast(result.error || "Import failed", "error");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = isId ? "Konfirmasi impor" : "Confirm import";
    }
    return;
  }
  DatasetApp.toast(
    isId
      ? `${DatasetApp.number(result.data.imported_rows)} transaksi berhasil diimpor dan diaktifkan.`
      : `${DatasetApp.number(result.data.imported_rows)} transactions imported and activated.`
  );
  if (btn) {
    btn.innerHTML = `<i class="bi bi-check2-circle"></i> ${isId ? "Dataset Aktif" : "Active Dataset"}`;
  }
  loadDatasets();
}

function bindDropzone() {
  const dropzone = document.getElementById("uploadDropzone");
  const fileInput = document.getElementById("datasetFile");
  if (!dropzone || !fileInput) return;

  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.click();
    }
  });

  ["dragenter", "dragover"].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove("drag-over");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (file) uploadFile(file);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadDatasets();
  bindDropzone();
  document.getElementById("uploadButton")?.addEventListener("click", () => document.getElementById("datasetFile").click());
  document.getElementById("datasetFile")?.addEventListener("change", (event) => {
    if (event.target.files[0]) uploadFile(event.target.files[0]);
  });
  document.getElementById("loadIndonesiaPresetBtn")?.addEventListener("click", async () => {
    const ok = await DatasetApp.switchPresetDataset("indonesia", true);
    if (ok) loadDatasets();
  });
  document.getElementById("loadGlobalPresetBtn")?.addEventListener("click", async () => {
    const ok = await DatasetApp.switchPresetDataset("global", true);
    if (ok) loadDatasets();
  });
  window.addEventListener("nexusfilters", loadDatasets);
});
