document.addEventListener("DOMContentLoaded", () => {
  const App = window.App;

  // 1. Analyst Profile Form (Ruben Setiaji default)
  const profile = App.getProfile();
  const nameInput = document.getElementById("profileNameInput");
  const roleInput = document.getElementById("profileRoleInput");
  const emailInput = document.getElementById("profileEmailInput");
  if (nameInput) nameInput.value = profile.name;
  if (roleInput) roleInput.value = profile.role;
  if (emailInput) emailInput.value = profile.email;

  document.getElementById("saveProfileBtn")?.addEventListener("click", () => {
    App.setProfile({
      name: nameInput?.value || "Ruben Setiaji",
      role: roleInput?.value || "Lead BI Architect",
      email: emailInput?.value || "ruben.setiaji@nexusbi.id",
    });
    App.toast(
      App.getLang() === "id"
        ? `Profil disimpan sebagai ${nameInput?.value || "Ruben Setiaji"}.`
        : `Profile updated to ${nameInput?.value || "Ruben Setiaji"}.`
    );
  });

  // 2. Theme Segmented Buttons (Light / Dark)
  document.querySelectorAll("#themeSegmented button[data-theme-val]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.themeVal === App.getTheme());
    btn.addEventListener("click", () => {
      App.applyTheme(btn.dataset.themeVal, true);
    });
  });

  // 3. Language Segmented Buttons (Indonesia / English)
  document.querySelectorAll("#langSegmented button[data-lang-val]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.langVal === App.getLang());
    btn.addEventListener("click", () => {
      App.applyLanguage(btn.dataset.langVal, true);
    });
  });

  // 4. Dataset Preset Switchers (Indonesia IDR vs Global USD)
  document.getElementById("reloadIndonesiaDemo")?.addEventListener("click", () => {
    App.switchPresetDataset("indonesia", true);
  });

  document.getElementById("reloadDemo")?.addEventListener("click", () => {
    App.switchPresetDataset("global", true);
  });

  // 5. Reduce Motion & Compact Sidebar Toggles
  const reduce = document.getElementById("reduceMotion");
  if (reduce) {
    reduce.checked = localStorage.getItem("reduceMotion") === "true";
    reduce.addEventListener("change", () => {
      localStorage.setItem("reduceMotion", reduce.checked);
      App.applyPreferences();
      App.toast(
        App.getLang() === "id"
          ? reduce.checked
            ? "Mode kurangi animasi diaktifkan."
            : "Animasi standar dipulihkan."
          : reduce.checked
          ? "Reduced motion enabled."
          : "Standard interface motion restored."
      );
    });
  }

  const compactSidebar = document.getElementById("compactSidebarToggle");
  if (compactSidebar) {
    compactSidebar.checked = localStorage.getItem("sidebarCollapsed") === "true";
    compactSidebar.addEventListener("change", () => {
      localStorage.setItem("sidebarCollapsed", compactSidebar.checked);
      App.applyPreferences();
      App.toast(
        App.getLang() === "id"
          ? compactSidebar.checked
            ? "Sidebar ringkas diaktifkan."
            : "Sidebar penuh dipulihkan."
          : compactSidebar.checked
          ? "Compact navigation rail enabled."
          : "Expanded navigation sidebar restored."
      );
    });
  }
});
