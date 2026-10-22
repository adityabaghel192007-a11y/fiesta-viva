/* ==========================================================================
   FIESTA VIVA — vocabulary.js  (Aritra Biswas)
   "Palabras para celebrar": search, category filter, flashcard mode and
   pronunciation with the browser's built-in speech synthesis (no API key).
   ========================================================================== */

/** Remove accents and make lowercase, so "musica" also finds "música". */
function normalizeText(text) {
  return String(text).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function initVocabulary() {
  const el = {
    form: document.getElementById("vocab-controls"),
    search: document.getElementById("vocab-search"),
    category: document.getElementById("vocab-category"),
    mode: document.getElementById("vocab-mode"),
    count: document.getElementById("vocab-count"),
    grid: document.getElementById("vocab-grid"),
    speechNote: document.getElementById("vocab-speech-note")
  };
  if (Object.values(el).some((node) => !node)) return;

  const state = { query: "", category: "all", flashcards: false, revealed: new Set() };

  // Pronunciation is optional: only offered if the browser supports it
  const canSpeak = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  el.speechNote.textContent = canSpeak
    ? "Tip: press “Listen” to hear a word using your browser’s built-in Spanish voice (if one is installed)."
    : "Pronunciation is not available in this browser, but search and flashcards still work.";

  // Category options come from the data
  const categories = [...new Set(VOCABULARY.map((w) => w.cat))];
  el.category.innerHTML = `<option value="all">All categories (${VOCABULARY.length})</option>` +
    categories.map((c) => {
      const n = VOCABULARY.filter((w) => w.cat === c).length;
      return `<option value="${escapeHTML(c)}">${escapeHTML(c)} (${n})</option>`;
    }).join("");

  function render() {
    const q = normalizeText(state.query);
    const words = VOCABULARY
      .map((w, index) => ({ ...w, index }))
      .filter((w) => (state.category === "all" || w.cat === state.category) &&
                     (q === "" || normalizeText(w.es).includes(q) || normalizeText(w.en).includes(q)));

    el.count.textContent = `Showing ${words.length} of ${VOCABULARY.length} words and phrases`;

    if (words.length === 0) {
      el.grid.innerHTML = `<li class="muted">No words found for “${escapeHTML(state.query)}”. Try another spelling or category.</li>`;
      return;
    }

    el.grid.innerHTML = words.map((w) => {
      const hidden = state.flashcards && !state.revealed.has(w.index);
      return `
        <li class="vocab-card${state.flashcards ? " is-flash" : ""}${hidden ? " is-hidden-meaning" : ""}">
          <span class="vocab-cat">${escapeHTML(w.cat)}</span>
          <span class="vocab-es" lang="es">${escapeHTML(w.es)}</span>
          <span class="vocab-en" ${hidden ? 'aria-hidden="true"' : ""}>${escapeHTML(w.en)}</span>
          <span class="vocab-actions">
            ${state.flashcards ? `<button class="icon-btn" type="button" data-flip="${w.index}" aria-pressed="${!hidden}">
                ${hidden ? "Show meaning" : "Hide meaning"}<span class="visually-hidden"> of ${escapeHTML(w.es)}</span></button>` : ""}
            ${canSpeak ? `<button class="icon-btn" type="button" data-speak="${w.index}">
                🔊 Listen<span class="visually-hidden"> to ${escapeHTML(w.es)}</span></button>` : ""}
          </span>
        </li>`;
    }).join("");
  }

  function speak(text) {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[¡!¿?]/g, ""));
    utterance.lang = "es-ES";
    utterance.rate = 0.85;
    const spanishVoice = window.speechSynthesis.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith("es"));
    if (spanishVoice) utterance.voice = spanishVoice;
    window.speechSynthesis.speak(utterance);
  }

  /* ---------- Event listeners ---------- */
  el.form.addEventListener("submit", (e) => e.preventDefault());
  el.search.addEventListener("input", () => { state.query = el.search.value; render(); });
  el.category.addEventListener("change", () => { state.category = el.category.value; render(); });

  el.mode.addEventListener("click", () => {
    state.flashcards = !state.flashcards;
    state.revealed.clear();
    el.mode.setAttribute("aria-pressed", String(state.flashcards));
    el.mode.textContent = `Flashcard mode: ${state.flashcards ? "on" : "off"}`;
    render();
  });

  el.grid.addEventListener("click", (e) => {
    const flip = e.target.closest("[data-flip]");
    const say = e.target.closest("[data-speak]");
    if (flip) {
      const i = Number(flip.dataset.flip);
      if (state.revealed.has(i)) state.revealed.delete(i); else state.revealed.add(i);
      render();
      // keep keyboard focus on the same button after re-rendering
      const again = el.grid.querySelector(`[data-flip="${i}"]`);
      if (again) again.focus();
    }
    if (say) {
      const word = VOCABULARY[Number(say.dataset.speak)];
      if (word) speak(word.es);
    }
  });

  render();
}
