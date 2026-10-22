/* ==========================================================================
   FIESTA VIVA — explorer.js  (Anay Parth)
   Interactive festival explorer: filters, calendar, details and comparison.
   Everything is built from the FESTIVALS array in js/data.js.
   ========================================================================== */

function initExplorer() {
  // Grab every element we need; stop quietly if the section is missing.
  const el = {
    form: document.getElementById("explorer-filters"),
    country: document.getElementById("filter-country"),
    region: document.getElementById("filter-region"),
    categories: document.getElementById("filter-category"),
    list: document.getElementById("explorer-list"),
    count: document.getElementById("explorer-count"),
    detail: document.getElementById("explorer-detail"),
    calendar: document.getElementById("calendar-grid"),
    compareForm: document.getElementById("compare-form"),
    compareA: document.getElementById("compare-a"),
    compareB: document.getElementById("compare-b"),
    compareError: document.getElementById("compare-error"),
    compareOutput: document.getElementById("compare-output")
  };
  if (Object.values(el).some((node) => !node)) return;

  // The whole explorer depends on this one state object.
  const state = { country: "all", region: "all", category: "all", selectedId: null };

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const unique = (values) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

  /* ---------- Build the filter controls from the data ---------- */
  el.country.innerHTML = `<option value="all">All countries</option>` +
    unique(FESTIVALS.map((f) => f.country)).map((c) => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("");

  function fillRegions() {
    const pool = FESTIVALS.filter((f) => state.country === "all" || f.country === state.country);
    el.region.innerHTML = `<option value="all">All regions</option>` +
      unique(pool.map((f) => f.region)).map((r) => `<option value="${escapeHTML(r)}">${escapeHTML(r)}</option>`).join("");
    el.region.value = "all";
    state.region = "all";
  }

  const categoryOptions = [["all", "All themes"], ...Object.entries(CATEGORY_LABELS)];
  el.categories.innerHTML = categoryOptions.map(([value, label], i) => `
    <label class="chip">
      <input type="radio" name="category" value="${value}" ${i === 0 ? "checked" : ""}>
      <span>${escapeHTML(label)}</span>
    </label>`).join("");

  /* ---------- Filtering ---------- */
  function matches(f) {
    return (state.country === "all" || f.country === state.country) &&
           (state.region === "all" || f.region === state.region) &&
           (state.category === "all" || f.categories.includes(state.category));
  }

  function applyFilters() {
    const results = FESTIVALS.filter(matches);
    el.count.textContent = `${results.length} of ${FESTIVALS.length} festivals shown`;

    if (results.length === 0) {
      el.list.innerHTML = `<li class="empty-state">No festival matches these filters. Try another theme or press “Reset filters”.</li>`;
    } else {
      el.list.innerHTML = results.map((f) => `
        <li>
          <button class="explorer-item" type="button" data-explore="${f.id}" aria-pressed="${f.id === state.selectedId}">
            ${imageTag(f.image, "")}
            <span>
              <strong>${escapeHTML(f.name)}</strong>
              <small>${escapeHTML(f.place)} · ${escapeHTML(f.country)}</small>
            </span>
          </button>
        </li>`).join("");
    }

    // Fade out calendar rows that don't match the filters
    el.calendar.querySelectorAll("[data-cal-row]").forEach((cell) => {
      cell.classList.toggle("cal-row-hidden", !results.some((f) => f.id === cell.dataset.calRow));
    });
  }

  /* ---------- Details panel ---------- */
  function showDetail(id, moveFocus) {
    const f = getFestival(id);
    if (!f) return;
    state.selectedId = id;
    el.list.querySelectorAll("[data-explore]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.explore === id)));
    el.detail.innerHTML = `${imageTag(f.image, f.alt)}${festivalDetailHTML(f, "h3")}`;
    if (moveFocus) el.detail.focus();
  }

  /* ---------- Calendar strip (12 months × festivals) ---------- */
  function renderCalendar() {
    let html = `<span class="cal-head" aria-hidden="true"></span>` +
      MONTHS.map((m) => `<span class="cal-head" aria-hidden="true">${m.charAt(0)}<span class="visually-hidden">${m}</span></span>`).join("");
    FESTIVALS.forEach((f) => {
      const monthsText = f.months.join(" and ");
      html += `<button type="button" class="cal-name" data-cal-row="${f.id}" data-explore-cal="${f.id}"
                 aria-label="${escapeHTML(f.name)}: usually ${monthsText}. Show details">${escapeHTML(f.name)}</button>`;
      html += MONTHS.map((m) =>
        `<span class="cal-cell${f.months.includes(m) ? " on" : ""}" data-cal-row="${f.id}" aria-hidden="true"></span>`).join("");
    });
    el.calendar.innerHTML = html;
  }

  /* ---------- Comparison table ---------- */
  function fillCompareSelects() {
    const options = FESTIVALS.map((f) => `<option value="${f.id}">${escapeHTML(f.name)} (${escapeHTML(f.country)})</option>`).join("");
    el.compareA.innerHTML = options;
    el.compareB.innerHTML = options;
    el.compareA.value = "fallas";
    el.compareB.value = "muertos";
  }

  function compare(idA, idB) {
    const a = getFestival(idA);
    const b = getFestival(idB);
    el.compareError.textContent = "";
    if (!a || !b) { el.compareError.textContent = "Please choose two festivals."; return; }
    if (a.id === b.id) { el.compareError.textContent = "Choose two different festivals to compare."; return; }

    const rows = [
      ["Location", (f) => `${escapeHTML(f.place)}<br><small>${escapeHTML(f.region)}, ${escapeHTML(f.country)}</small>`],
      ["Timing", (f) => escapeHTML(f.when)],
      ["Traditions", (f) => `<ul>${f.traditions.slice(0, 3).map((t) => `<li>${escapeHTML(t)}</li>`).join("")}</ul>`],
      ["Food", (f) => escapeHTML(f.food)],
      ["Music", (f) => escapeHTML(f.music)],
      ["Themes", (f) => f.categories.map((c) => CATEGORY_LABELS[c]).join(", ")]
    ];

    el.compareOutput.innerHTML = `
      <table class="compare-table">
        <caption>Comparing ${escapeHTML(a.name)} and ${escapeHTML(b.name)}</caption>
        <thead><tr><th scope="col">Aspect</th><th scope="col">${escapeHTML(a.name)}</th><th scope="col">${escapeHTML(b.name)}</th></tr></thead>
        <tbody>
          ${rows.map(([label, cell]) => `<tr><th scope="row">${label}</th><td>${cell(a)}</td><td>${cell(b)}</td></tr>`).join("")}
        </tbody>
      </table>`;
  }

  /* ---------- Event listeners ---------- */
  el.country.addEventListener("change", () => {
    state.country = el.country.value;
    fillRegions();
    applyFilters();
  });
  el.region.addEventListener("change", () => { state.region = el.region.value; applyFilters(); });
  el.categories.addEventListener("change", (e) => {
    if (e.target.name === "category") { state.category = e.target.value; applyFilters(); }
  });
  el.form.addEventListener("submit", (e) => e.preventDefault());
  el.form.addEventListener("reset", () => {
    // Wait for the browser to reset the inputs, then sync our state
    setTimeout(() => {
      state.country = "all"; state.category = "all";
      el.country.value = "all";
      fillRegions();
      applyFilters();
    });
  });

  el.list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-explore]");
    if (btn) showDetail(btn.dataset.explore, false);
  });
  el.calendar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-explore-cal]");
    if (btn) showDetail(btn.dataset.exploreCal, true);
  });

  el.compareForm.addEventListener("submit", (e) => {
    e.preventDefault();
    compare(el.compareA.value, el.compareB.value);
  });

  /* ---------- First render ---------- */
  fillRegions();
  renderCalendar();
  applyFilters();
  showDetail(FESTIVALS[0].id, false); // start with one festival selected
  fillCompareSelects();
  compare(el.compareA.value, el.compareB.value);
}
