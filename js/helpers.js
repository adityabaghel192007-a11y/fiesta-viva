/* ==========================================================================
   FIESTA VIVA — helpers.js
   Small utility functions shared by every feature file.
   ========================================================================== */

/** Escape text before inserting it into HTML (prevents broken markup). */
function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Find a festival object by its id (returns undefined if not found). */
function getFestival(id) {
  return FESTIVALS.find((festival) => festival.id === id);
}

/** Build "Source: A · B" links from a list of source ids in SOURCES. */
function sourceLinks(ids = []) {
  const links = ids
    .filter((id) => SOURCES[id])
    .map((id) => {
      const s = SOURCES[id];
      return `<a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.publisher)}</a>`;
    });
  if (links.length === 0) return "";
  return `<p class="cite">Source${links.length > 1 ? "s" : ""}: ${links.join(" · ")}</p>`;
}

/** Return an <img> tag. Images that fail to load are swapped for a labelled placeholder. */
function imageTag(src, alt, extra = "") {
  return `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" ${extra}>`;
}

/**
 * Graceful image fallback: one listener on the whole document catches the
 * "error" event of any <img> (error events don't bubble, so we use capture).
 */
function enableImageFallbacks() {
  document.addEventListener("error", (event) => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.failed) return;
    img.dataset.failed = "true";
    const box = document.createElement("div");
    box.className = "img-fallback";
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", img.alt || "Image unavailable");
    box.textContent = img.alt ? img.alt.split(/[,:]/)[0] : "Image unavailable";
    img.replaceWith(box);
  }, true);
}

/** Small label for a festival's country: Spain vs the wider Hispanic world. */
function countryTag(festival) {
  return festival.country === "Spain"
    ? `<span class="tag tag-spain">Spain · España</span>`
    : `<span class="tag tag-world">${escapeHTML(festival.country)} · Hispanic world</span>`;
}

/** Turn ["food","music"] into readable labels. */
const CATEGORY_LABELS = {
  food: "Food · comida",
  music: "Music & dance · música",
  art: "Art · arte",
  tradition: "Traditional celebration · tradición"
};
