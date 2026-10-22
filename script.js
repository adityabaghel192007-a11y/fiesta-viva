/* ==========================================================================
   FIESTA VIVA — script.js  (the "conductor")
   Renders the festival, cuisine, music and team sections from js/data.js,
   runs the navigation, the "Learn more" dialog and the compás player,
   and starts the features that live in their own files:
     js/explorer.js   → initExplorer()   (Anay)
     js/quiz.js       → initQuiz()       (Aritra)
     js/vocabulary.js → initVocabulary() (Aritra)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // If data.js failed to load, stop safely instead of throwing errors.
  if (typeof FESTIVALS === "undefined") {
    console.warn("Fiesta Viva: js/data.js did not load, so content cannot be shown.");
    return;
  }

  enableImageFallbacks();
  initNavigation();
  renderFestivals();
  initFestivalDialog();
  renderDishes();
  renderMusic();
  initCompas();
  renderTeam();
  renderFooter();

  // Feature files (each checks that its own HTML exists before running)
  if (typeof initExplorer === "function") initExplorer();
  if (typeof initQuiz === "function") initQuiz();
  if (typeof initVocabulary === "function") initVocabulary();
});

/* ---------------------------------------------------------------
   NAVIGATION: mobile menu + active link while scrolling
   --------------------------------------------------------------- */
function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-links");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu after choosing a link or pressing Escape
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
  });

  // Highlight the link of the section currently on screen
  const links = [...menu.querySelectorAll("a")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => {
        const active = a.getAttribute("href") === `#${entry.target.id}`;
        a.classList.toggle("is-active", active);
        if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" }); // "active" = section crossing the middle of the screen
  sections.forEach((s) => observer.observe(s));
}

/* ---------------------------------------------------------------
   FESTIVALS (Aditya): four featured cards
   --------------------------------------------------------------- */
function renderFestivals() {
  const grid = document.getElementById("festival-grid");
  if (!grid) return;

  grid.innerHTML = FESTIVALS.filter((f) => f.featured).map((f) => `
    <article class="festival-card" aria-labelledby="fest-${f.id}">
      <div class="card-img">${imageTag(f.image, f.alt)}</div>
      <div class="card-body">
        <div class="card-tags">${countryTag(f)}</div>
        <h3 class="card-title" id="fest-${f.id}">${escapeHTML(f.name)}</h3>
        <p class="card-sub">${escapeHTML(f.english)}</p>
        ${f.worldNote ? `<p class="world-note">${escapeHTML(f.worldNote)}</p>` : ""}
        <dl class="facts">
          <dt>Where</dt><dd>${escapeHTML(f.place)}</dd>
          <dt>When</dt><dd>${escapeHTML(f.when)}</dd>
        </dl>
        <p>${escapeHTML(f.summary)}</p>
        <blockquote class="phrase">
          <span class="es" lang="es">${escapeHTML(f.phrases[0].es)}</span>
          <span class="en">${escapeHTML(f.phrases[0].en)}</span>
        </blockquote>
        <div class="card-actions">
          <button class="btn btn-primary btn-small" type="button" data-festival="${f.id}"
                  aria-haspopup="dialog">Learn more <span class="visually-hidden">about ${escapeHTML(f.name)}</span></button>
        </div>
      </div>
    </article>`).join("");
}

/* Full festival details, used by the dialog AND the explorer (one source of HTML). */
function festivalDetailHTML(f, headingLevel = "h2", headingId = "") {
  const foodLabel = {
    festival: `<span class="tag tag-festival food-label">documented festival link</span>`,
    none: `<span class="tag tag-everyday food-label">no specific dish documented</span>`
  }[f.foodKind] || "";
  const H = headingLevel;
  return `
    <div class="card-tags">${countryTag(f)} <span class="tag tag-everyday">${escapeHTML(f.region)}</span></div>
    <${H} class="detail-title" ${headingId ? `id="${headingId}"` : ""}>${escapeHTML(f.name)}</${H}>
    <p class="card-sub">${escapeHTML(f.english)}</p>
    ${f.worldNote ? `<p class="world-note">${escapeHTML(f.worldNote)}</p>` : ""}
    <dl class="facts">
      <dt>Where</dt><dd>${escapeHTML(f.place)}</dd>
      <dt>When</dt><dd>${escapeHTML(f.when)}</dd>
      <dt>Themes</dt><dd>${f.categories.map((c) => CATEGORY_LABELS[c]).join(", ")}</dd>
    </dl>
    <h3>History · <span lang="es">historia</span></h3>
    <p>${escapeHTML(f.history)}</p>
    <h3>Traditions · <span lang="es">tradiciones</span></h3>
    <ul>${f.traditions.map((t) => `<li>${escapeHTML(t)}</li>`).join("")}</ul>
    <h3>Why it matters · <span lang="es">importancia cultural</span></h3>
    <p>${escapeHTML(f.significance)}</p>
    <h3>Food and drink · <span lang="es">comida</span> ${foodLabel}</h3>
    <p>${escapeHTML(f.food)}</p>
    <h3>Music and dance · <span lang="es">música y baile</span></h3>
    <p>${escapeHTML(f.music)}</p>
    <h3>Useful phrases · <span lang="es">frases útiles</span></h3>
    ${f.phrases.map((p) => `
      <blockquote class="phrase">
        <span class="es" lang="es">${escapeHTML(p.es)}</span>
        <span class="en">${escapeHTML(p.en)}</span>
      </blockquote>`).join("")}
    ${sourceLinks(f.sources)}`;
}

/* ---------------------------------------------------------------
   "LEARN MORE" DIALOG — native <dialog> traps focus and closes on Esc
   --------------------------------------------------------------- */
let lastFocusedButton = null;

function initFestivalDialog() {
  const dialog = document.getElementById("festival-dialog");
  const content = document.getElementById("dialog-content");
  const closeBtn = document.getElementById("dialog-close");
  if (!dialog || !content || typeof dialog.showModal !== "function") return;

  // One click listener for every "Learn more" button (event delegation)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-festival]");
    if (btn) openFestivalDialog(btn.dataset.festival, btn);
  });

  closeBtn.addEventListener("click", () => dialog.close());
  // Clicking the dark backdrop (outside the box) closes the dialog
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  // Return focus to the button that opened the dialog
  dialog.addEventListener("close", () => { if (lastFocusedButton) lastFocusedButton.focus(); });
}

function openFestivalDialog(id, opener) {
  const dialog = document.getElementById("festival-dialog");
  const content = document.getElementById("dialog-content");
  const festival = getFestival(id);
  if (!dialog || !content || !festival) return;

  lastFocusedButton = opener || null;
  content.innerHTML = `
    <div class="dialog-hero">${imageTag(festival.image, festival.alt)}</div>
    <div class="dialog-body">${festivalDetailHTML(festival, "h2", "dialog-title")}</div>`;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.getElementById("dialog-close").focus();
}

/* ---------------------------------------------------------------
   CUISINE (Pranshu)
   --------------------------------------------------------------- */
function renderDishes() {
  const grid = document.getElementById("dish-grid");
  if (!grid) return;

  grid.innerHTML = DISHES.map((d) => `
    <article class="dish-card" aria-labelledby="dish-${d.id}">
      <div class="card-img">${imageTag(d.image, d.alt)}</div>
      <div class="card-body">
        <div class="card-tags"><span class="tag tag-${d.kind}">${escapeHTML(d.kindLabel)}</span></div>
        <h3 id="dish-${d.id}" lang="es">${escapeHTML(d.name)}</h3>
        <p class="card-sub">${escapeHTML(d.english)}</p>
        <p class="dish-context">${escapeHTML(d.context)}</p>
        <p class="mini-h">Main ingredients · <span lang="es">ingredientes</span></p>
        <ul class="ingredients">${d.ingredients.map((i) => `<li>${escapeHTML(i)}</li>`).join("")}</ul>
        <p class="mini-h">Why it matters</p>
        <p>${escapeHTML(d.why)}</p>
        <blockquote class="phrase">
          <span class="es" lang="es">${escapeHTML(d.sentence.es)}</span>
          <span class="en">${escapeHTML(d.sentence.en)}</span>
        </blockquote>
        ${sourceLinks(d.sources)}
      </div>
    </article>`).join("");
}

/* ---------------------------------------------------------------
   MUSIC & DANCE (Shreyam)
   --------------------------------------------------------------- */
function renderMusic() {
  const grid = document.getElementById("music-grid");
  if (!grid) return;

  grid.innerHTML = MUSIC.map((m) => `
    <article class="music-card" aria-labelledby="music-${m.id}">
      <div class="card-img">${imageTag(m.image, m.alt)}</div>
      <div class="card-body">
        <p class="music-region">${escapeHTML(m.region)}</p>
        <h3 id="music-${m.id}" lang="es">${escapeHTML(m.name)}</h3>
        <p class="card-sub">${escapeHTML(m.english)}</p>
        <p>${escapeHTML(m.text)}</p>
        ${sourceLinks(m.sources)}
      </div>
    </article>`).join("");
}

/* ---------------------------------------------------------------
   COMPÁS PLAYER (Shreyam) — Web Audio API, no files, no autoplay
   --------------------------------------------------------------- */
function initCompas() {
  const list = document.getElementById("compas-beats");
  const playBtn = document.getElementById("compas-play");
  const tempo = document.getElementById("compas-tempo");
  const tempoOut = document.getElementById("compas-tempo-value");
  const status = document.getElementById("compas-status");
  if (!list || !playBtn || !tempo) return;

  const ACCENTS = [3, 6, 8, 10, 12];  // soleá-style 12-beat cycle
  list.innerHTML = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    const accent = ACCENTS.includes(n);
    return `<li class="beat${accent ? " accent" : ""}" aria-label="Beat ${n}${accent ? ", accented" : ""}">${n}</li>`;
  }).join("");
  const beats = [...list.children];

  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    playBtn.disabled = true;
    status.textContent = "Sound is not supported in this browser, but you can still count the accents: 3, 6, 8, 10, 12.";
    return;
  }

  let ctx = null;
  let timer = null;
  let beat = 0;

  // A "clap" = a very short burst of filtered white noise
  function clap(accented) {
    const length = Math.floor(ctx.sampleRate * 0.08);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);

    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = accented ? 1500 : 2400;
    gain.gain.value = accented ? 0.9 : 0.3;
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  }

  function tick() {
    beats.forEach((b) => b.classList.remove("is-on"));
    const n = beat + 1;
    beats[beat].classList.add("is-on");
    clap(ACCENTS.includes(n));
    beat = (beat + 1) % 12;
  }

  function start() {
    ctx = ctx || new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();
    beat = 0;
    tick();
    timer = setInterval(tick, 60000 / Number(tempo.value));
    playBtn.textContent = "Stop rhythm";
    playBtn.setAttribute("aria-pressed", "true");
    status.textContent = `Playing at ${tempo.value} beats per minute. Clap on the accents!`;
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    beats.forEach((b) => b.classList.remove("is-on"));
    playBtn.textContent = "Play rhythm";
    playBtn.setAttribute("aria-pressed", "false");
    status.textContent = "Stopped.";
  }

  playBtn.addEventListener("click", () => (timer ? stop() : start()));

  tempo.addEventListener("input", () => {
    tempoOut.textContent = tempo.value;
    if (timer) { // restart the interval at the new speed
      clearInterval(timer);
      timer = setInterval(tick, 60000 / Number(tempo.value));
    }
  });

  // Stop the sound if the visitor switches tab
  document.addEventListener("visibilitychange", () => { if (document.hidden && timer) stop(); });
}

/* ---------------------------------------------------------------
   TEAM: contributor cards + one detail panel
   Spanish words in team text use [[spanish|english]] markup.
   --------------------------------------------------------------- */

/**
 * Convert [[es|en]] and [[es|en|ca]] markup into highlighted HTML and
 * collect the distinct Spanish terms. Valencian terms (ca) are shown but
 * not counted, because they are not Spanish.
 */
function parseSpanishMarkup(text) {
  const terms = [];
  const html = escapeHTML(text).replace(/\[\[([^\]|]+)\|([^\]|]+)(?:\|(ca))?\]\]/g, (_, es, en, ca) => {
    if (!ca) terms.push({ es: es.trim(), en: en.trim() });
    const cls = ca ? "es-term ca" : "es-term";
    const lang = ca ? "ca" : "es";
    const label = ca ? `${en} (Valencian)` : en;
    return `<span class="${cls}" lang="${lang}" tabindex="0" data-en="${label}">${es}</span>`;
  });
  return { html, terms };
}

/** Distinct terms across all paragraphs, compared case-insensitively. */
function distinctTerms(paragraphs) {
  const seen = new Map();
  paragraphs.forEach((p) => parseSpanishMarkup(p).terms.forEach((t) => {
    const key = t.es.toLocaleLowerCase("es");
    if (!seen.has(key)) seen.set(key, t);
  }));
  return [...seen.values()];
}

function initials(name) {
  return name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function renderTeam() {
  const grid = document.getElementById("team-grid");
  const panel = document.getElementById("team-panel");
  if (!grid || !panel) return;

  grid.innerHTML = TEAM.map((m) => `
    <button class="member-card accent-${m.accent}" type="button" id="member-${m.id}"
            data-member="${m.id}" aria-expanded="false" aria-controls="team-panel">
      <span class="member-initials" aria-hidden="true">${initials(m.name)}</span>
      <span class="member-name">${escapeHTML(m.name)}</span>
      <span class="member-reg">${escapeHTML(m.reg)}</span>
      <span class="member-role">${escapeHTML(m.role)}</span>
      <span class="member-cta">View contribution</span>
    </button>`).join("");

  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-member]");
    if (card) showMember(card.dataset.member, false);
  });

  // "Researched by …" bylines in other sections jump to the right panel
  document.querySelectorAll("[data-open-member]").forEach((btn) => {
    btn.addEventListener("click", () => showMember(btn.dataset.openMember, true));
  });

  // Show the first member by default (without moving keyboard focus)
  showMember(TEAM[0].id, false, false);
}

function showMember(id, scrollToPanel, moveFocus = true) {
  const member = TEAM.find((m) => m.id === id);
  const panel = document.getElementById("team-panel");
  if (!member || !panel) return;

  document.querySelectorAll(".member-card").forEach((card) => {
    card.setAttribute("aria-expanded", String(card.dataset.member === id));
  });

  const paragraphs = member.content.map((p) => `<p>${parseSpanishMarkup(p).html}</p>`).join("");
  const terms = distinctTerms(member.content);
  const target = 25;
  const reflection = escapeHTML(member.reflection)
    .replace(/\[([^\]]+)\]/g, '<span class="placeholder">[$1]</span>');

  panel.className = `team-panel accent-${member.accent}`;
  panel.innerHTML = `
    <div class="panel-head">
      <div>
        <p class="eyebrow">Contribution · <span lang="es">contribución</span></p>
        <h3>${escapeHTML(member.name)}</h3>
        <p class="member-reg">Registration no. ${escapeHTML(member.reg)}</p>
        <p><strong>Topic:</strong> ${escapeHTML(member.role)}<br>
           <strong>Owns on the site:</strong> ${escapeHTML(member.feature)}</p>
      </div>
    </div>
    <div class="panel-cols">
      <div class="contribution">
        <p class="small muted">Spanish terms are highlighted — hover or focus one to see its English meaning.
          <span class="es-term ca" data-en="example">Green</span> terms are Valencian (Catalan), shown for accuracy but not counted as Spanish.</p>
        ${paragraphs}
        <section class="reflection" aria-label="Reflection draft">
          <h4>Personal reflection — <em>draft</em></h4>
          <p>${reflection}</p>
          <p class="small muted">Replace the highlighted [brackets] with your own honest thoughts in <code>js/data.js</code> before submission.</p>
        </section>
      </div>
      <aside>
        <div class="side-box">
          <h4>Vocabulary check</h4>
          <div class="counter">
            <span class="counter-num ${terms.length < target ? "low" : ""}">${terms.length}</span>
            <span>distinct Spanish words and phrases used in this section (target: ${target})
              — ${terms.length >= target ? "✓ requirement met" : "✗ add more"}</span>
          </div>
          <details>
            <summary>Show glossary (${terms.length} terms)</summary>
            <ul class="glossary">${terms.map((t) => `<li><span lang="es"><strong>${escapeHTML(t.es)}</strong></span> — ${escapeHTML(t.en)}</li>`).join("")}</ul>
          </details>
          <p class="small muted" style="margin:0.6rem 0 0">Counted automatically from the text on the left, so the number always matches what is written.</p>
        </div>
        <div class="side-box">
          <h4>What I researched</h4>
          <ul>${member.researched.map((r) => `<li>${escapeHTML(r)}</li>`).join("")}</ul>
        </div>
        <div class="side-box code-note">
          <h4>Explain the code</h4>
          <p>${escapeHTML(member.codeNote)}</p>
        </div>
      </aside>
    </div>`;

  if (scrollToPanel) {
    document.getElementById("team").scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
  if (moveFocus) panel.focus({ preventScroll: !scrollToPanel });
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------------------------------------------------------------
   FOOTER: team names + sources list (both generated from data.js)
   --------------------------------------------------------------- */
function renderFooter() {
  const team = document.getElementById("footer-team");
  const list = document.getElementById("sources-list");
  if (team) {
    team.innerHTML = TEAM.map((m) => `<li>${escapeHTML(m.name)} <span>· ${escapeHTML(m.reg)}</span></li>`).join("");
  }
  if (list) {
    list.innerHTML = Object.values(SOURCES).map((s) => `
      <li><a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.title)}</a>
        — ${escapeHTML(s.publisher)}</li>`).join("");
  }
}
