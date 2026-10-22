# Fiesta Viva — Explore the Hispanic World

> *Tradición, sabor y ritmo* — Tradition, flavour and rhythm.

**Fiesta Viva** is an educational website built for the Spanish assignment **“Creative Exploration of the Hispanic World.”**
Our group topic is **Spanish festivals**, with two connected subtopics: **festival cuisine** and **music and dance**.

The site works like a small cultural magazine combined with interactive learning tools: festival stories, food and music
cards, a festival explorer with comparisons, a 20-question Spanish quiz, a searchable vocabulary with flashcards, and a
contribution page for each of the five team members.

| Team member | Reg. no. | Owns |
|---|---|---|
| Aditya Baghel | 25BAI1628 | Festivals: origins, traditions, history · “Learn more” dialog |
| Pranshu Suresh Gupta | 25BAI1620 | Festival cuisine · dish cards with festival/everyday labels |
| Shreyam Manna | 25BAI1343 | Music & dance · interactive compás (rhythm) player |
| Anay Parth | 25BAI1273 | Festival explorer · filters, calendar, details, comparison |
| Aritra Biswas | 25BAI1460 | Spanish quiz · vocabulary search, flashcards, pronunciation |

---

## Contents

1. [Features](#features)
2. [Technology stack](#technology-stack)
3. [File structure](#file-structure)
4. [Run it locally](#run-it-locally)
5. [How the quiz scoring works](#how-the-quiz-scoring-works)
6. [How the explorer filters and comparison work](#how-the-explorer-filters-and-comparison-work)
7. [How the 25-word vocabulary check works](#how-the-25-word-vocabulary-check-works)
8. [Deploy with GitHub Pages](#deploy-with-github-pages)
9. [Suggested commit plan](#suggested-commit-plan)
10. [Sources, images and attributions](#sources-images-and-attributions)
11. [Before submission — checklist](#before-submission--checklist)
12. [Viva / presentation guide (all five members)](#viva--presentation-guide)
13. [Testing performed](#testing-performed)

---

## Features

- **Responsive navigation** — sticky header, smooth scrolling, active-section highlighting, working mobile menu (closes on link click or `Esc`).
- **Hero** — brand, tagline with translation, two calls to action and an original poster illustration. No invented statistics.
- **Festivals** — La Tomatina, Las Fallas, San Fermín and Día de los Muertos, each with location, timing (noting when dates move), history, traditions, significance, Spanish phrases, food, music and sources. Día de los Muertos is clearly labelled as **Mexican, not Spanish**. *Learn more* opens an accessible `<dialog>`.
- **Cuisine — “Sabores de Fiesta”** — paella valenciana, churros con chocolate, tapas, tortilla española, buñuelos de calabaza and pan de muerto. Every dish is labelled **Festival food / Regional dish / Everyday** so we never claim a dish is a festival’s “official” food without evidence.
- **Music & dance — “El Ritmo de la Fiesta”** — flamenco (and why it is *Andalusian*, not universal), guitar and palmas, the Aragonese jota, and street bands. Includes a **12-beat compás player** generated with the Web Audio API — no audio files, no autoplay.
- **Festival explorer** — filter by country, region and theme; 12-month calendar; details panel; side-by-side comparison table for location, timing, traditions, food, music and themes. Includes three extra festivals for comparison (Feria de Abril, Fiestas del Pilar, Carnaval de Barranquilla).
- **Spanish quiz — “¡Pon a prueba tu español!”** — 20 original questions, 4 options each, shuffled per attempt, progress bar, score, explanation after each answer, results with percentage, review of mistakes, restart. Mouse, `Tab`/`Enter`, or number keys `1`–`4`.
- **Vocabulary — “Palabras para celebrar”** — 57 words and phrases; search in Spanish or English (accent-insensitive: `musica` finds *música*); category filter; flashcard mode; “Listen” button using the browser’s built-in speech synthesis (hidden gracefully if unsupported).
- **Our Team** — five contributor cards. Each panel shows topic, research list, original text with highlighted Spanish terms (hover/focus for English), an automatic vocabulary counter + glossary, a reflection draft, and an “Explain the code” note.
- **Footer** — branding, Spanish sign-off, navigation, team names, educational-project note and a full sources list.
- **Accessibility** — semantic HTML, skip link, labelled form controls, visible focus rings, `aria-expanded` / `aria-pressed` states, live regions for results, correct/incorrect shown with **text and colour**, `prefers-reduced-motion` support, image fallbacks.

## Technology stack

- **HTML5**, **CSS3** (custom properties, grid, flexbox) and **vanilla JavaScript (ES6+)**.
- No frameworks, no build tools, no backend, no API keys, no npm install.
- Optional external dependency: **Google Fonts** (Fraunces + Work Sans). If they fail to load, the CSS falls back to Georgia and system fonts — the site still works fully.

## File structure

```
fiesta-viva/
├── index.html            Page structure (all sections, empty containers filled by JS)
├── styles.css            All styling; colour palette & spacing in :root variables
├── script.js             "Conductor": nav, festivals, dialog, cuisine, music, compás, team, footer
├── js/
│   ├── data.js           ALL content: SOURCES, FESTIVALS, DISHES, MUSIC, VOCABULARY, QUIZ_QUESTIONS, TEAM
│   ├── helpers.js        Shared helpers: escapeHTML, getFestival, sourceLinks, image fallback
│   ├── explorer.js       Festival explorer (Anay)
│   ├── quiz.js           Quiz logic (Aritra)
│   └── vocabulary.js     Vocabulary search & flashcards (Aritra)
├── assets/
│   ├── favicon.svg
│   └── illustrations/    18 original SVG illustrations
├── .nojekyll             Tells GitHub Pages to serve files as-is
└── README.md
```

**Key design idea:** content lives in **one place** (`js/data.js`). The other files only *read* it and turn it into HTML.
To fix a fact, edit `data.js` once and every section that uses it (cards, dialog, explorer, comparison) updates.

Scripts load in this order (all with `defer`): `data.js → helpers.js → explorer.js → quiz.js → vocabulary.js → script.js`.
`script.js` runs last and calls `initExplorer()`, `initQuiz()` and `initVocabulary()`.

## Run it locally

**Option 1 — just open it:** double-click `index.html`. Everything works from the file system.

**Option 2 — local server (closer to GitHub Pages):**

```bash
cd fiesta-viva
python3 -m http.server 8000
# open http://localhost:8000
```

Or use the VS Code **Live Server** extension → right-click `index.html` → *Open with Live Server*.

## How the quiz scoring works

File: `js/quiz.js` · Data: `QUIZ_QUESTIONS` in `js/data.js`

Each question looks like this:

```js
{ id: 1, topic: "Locations", question: "In which town is La Tomatina held?",
  options: ["Buñol", "Pamplona", "Sevilla", "Zaragoza"], answer: 0,
  explanation: "La Tomatina takes place in Buñol, a town in the province of Valencia." }
```

1. **Start / restart** → `startQuiz()` makes a shuffled *copy* of the questions using the **Fisher–Yates** algorithm and also shuffles each question’s options. Each option is stored as `{ text, isCorrect }`, so shuffling can never break the answer key. The order is fixed for the whole attempt → **no repeats, no skips**.
2. **Answer** → `selectAnswer(i)` ignores a second click, disables all options, adds **+1** to the score if `isCorrect`, otherwise saves `{question, chosen, correct, explanation}` in `mistakes`.
3. **Feedback** → the correct option gets a green border and “✓ Correct answer”; a wrong choice gets a dashed red border and “✗ Your answer”, plus the explanation.
4. **Next** → the *Next* button only appears after answering, so a question cannot be skipped.
5. **Results** → `percentage = Math.round(score / total × 100)`, a message based on the percentage, and a review list of every mistake.

## How the explorer filters and comparison work

File: `js/explorer.js` · Data: `FESTIVALS` in `js/data.js`

- All filters are stored in one `state` object: `{ country, region, category, selectedId }`.
- The dropdown options are **built from the data** (unique countries/regions), so a new festival automatically appears.
- Choosing a country rebuilds the region list to only that country’s regions.
- `applyFilters()` uses `FESTIVALS.filter(matches)` where `matches(f)` checks all three conditions, then re-renders the list, the result count (announced by screen readers) and fades non-matching rows in the calendar.
- Clicking a festival calls `showDetail(id)`, which reuses `festivalDetailHTML()` from `script.js` (the same function the dialog uses).
- **Compare:** the form takes two festival IDs; `compare(a, b)` checks they are different, then builds a `<table>` from a list of rows `[label, functionThatReturnsCell]`.

## How the 25-word vocabulary check works

In `TEAM[].content` (in `data.js`) Spanish terms are written as `[[spanish|english]]`, for example
`[[el compás|the rhythmic cycle]]`. Valencian (Catalan) terms such as *mascletà* are written `[[mascletà|firecracker show|ca]]`
— they are shown in green but **not counted**, because they are not Spanish.

`parseSpanishMarkup()` in `script.js` turns the markup into highlighted text (hover/focus → English meaning) and
`distinctTerms()` counts each term once (case-insensitive). The counter and glossary are therefore always calculated from
the student’s **actual text** — if a student edits their paragraphs, the number updates automatically.

Current counts: Aditya 31 · Pranshu 30 · Shreyam 28 · Anay 29 · Aritra 28 (target 25).
A few counted terms are multi-word phrases (e.g. *pan de muerto*); each student should check their glossary and add more
single words if the evaluator counts strictly by individual words.

## Deploy with GitHub Pages

1. Create a new **public** repository on GitHub (e.g. `fiesta-viva`). Don’t add a README there (we already have one).
2. Upload the project from the `fiesta-viva` folder:
   ```bash
   cd fiesta-viva
   git init
   git add .
   git commit -m "Initial Fiesta Viva website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/fiesta-viva.git
   git push -u origin main
   ```
   (Or use *Add file → Upload files* on GitHub and drag in the folder’s contents — `index.html` must be at the repository root.)
3. On GitHub open **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Branch: **main**, folder: **/ (root)** → **Save**.
6. Wait 1–2 minutes, refresh the Pages settings page and open the link shown:
   `https://<your-username>.github.io/fiesta-viva/`

All paths in the project are relative (`styles.css`, `js/data.js`, `assets/...`), so the site works under the `/fiesta-viva/` sub-path.

## Suggested commit plan

A plan so each teammate contributes through their own commits. (Nothing has been committed yet — usernames are up to you.)

| Order | Branch | Who | Commit(s) |
|---|---|---|---|
| 1 | `main` | Aditya | `Add project structure, index.html skeleton and styles` |
| 2 | `feature/festivals` | Aditya | `Add festival data (FESTIVALS) and sources` · `Render festival cards and Learn more dialog` · `Personalise my reflection` |
| 3 | `feature/cuisine` | Pranshu | `Add DISHES data with festival/regional/everyday labels` · `Render cuisine cards` · `Personalise my reflection` |
| 4 | `feature/music` | Shreyam | `Add MUSIC data` · `Add Web Audio compás player` · `Personalise my reflection` |
| 5 | `feature/explorer` | Anay | `Add extra festivals for comparison` · `Add explorer filters and calendar` · `Add comparison table` · `Personalise my reflection` |
| 6 | `feature/quiz-vocab` | Aritra | `Add quiz questions and Fisher–Yates shuffle` · `Add results and review screen` · `Add vocabulary search, flashcards, speech` · `Personalise my reflection` |
| 7 | `main` | Everyone | Open a Pull Request per branch, review each other’s PR, merge, then `Update README and viva guide` |

Tip: each member should at least commit their **own personalised reflection** and one improvement to their own feature.

## Sources, images and attributions

- **Sources** are stored in the `SOURCES` object in `js/data.js`. They are cited under each card/dialog (“Source: …”) and listed in full in the footer (*Sources & further reading*). They include UNESCO Intangible Cultural Heritage, Spain.info (Turespaña), Comunitat Valenciana Tourism, Visit València, the Ayuntamiento de Zaragoza, Zaragoza Tourism, UNAM Boston, Universidad Pablo de Olavide and Wikipedia.
- **Images:** all 18 illustrations in `assets/illustrations/` are original SVG artwork made for this project, so there are no copyright or licensing issues and nothing depends on external image hosts. If you replace them with photographs, use openly licensed images (e.g. Wikimedia Commons with CC BY/CC BY-SA) and credit the author and licence next to the image and in this README.
- **Fonts:** Fraunces and Work Sans from Google Fonts (SIL Open Font License).
- **Accuracy notes kept in the text:** La Tomatina’s 1945 origin story is presented as local tradition; the San Fermín bull runs are noted as debated on animal-welfare and safety grounds; no single dish is claimed for San Fermín or the Barranquilla carnival; flamenco is described as Andalusian rather than “the music of every festival”.

## Before submission — checklist

- [ ] Each student replaces the **[bracketed]** parts of their `reflection` in `js/data.js` with honest personal thoughts.
- [ ] Each student reads their own section aloud and checks the glossary meanings.
- [ ] Click one source link per section to confirm it still opens.
- [ ] Open the live GitHub Pages link on a phone and on a laptop.
- [ ] Do one full quiz attempt and one restart.

---

## Viva / presentation guide

**Suggested running order (≈ 11–12 minutes):** Aditya introduces the site and festivals → Pranshu (cuisine) → Shreyam (music, with live compás demo) → Anay (explorer) → Aritra (quiz and vocabulary, ending with a live quiz). Everyone should be able to answer: *“What is the purpose of the website?”* —
**“To explore Spanish and Hispanic festivals through their history, food and music, while practising real Spanish vocabulary, in a site where every content block is backed by a source.”**

---

### 1. Aditya Baghel — 25BAI1628 · Festivals

**2-minute explanation**
> “Our website is called Fiesta Viva — *tradición, sabor y ritmo*. My part is the festivals section. I researched four celebrations: La Tomatina in Buñol, Las Fallas in Valencia, San Fermín in Pamplona and Día de los Muertos in Mexico. One thing I was careful about is that Día de los Muertos is not Spanish — it is Mexican, part of the wider Spanish-speaking world — so the card says that clearly.
> Each card shows where and when the festival happens. I noted when the date moves, like La Tomatina on the last Wednesday of August. When you click *Learn more*, a dialog opens with history, traditions, cultural significance, food, music, Spanish phrases and sources.
> I also learned to separate legend from fact: the famous 1945 origin of La Tomatina is a local story that is not well documented, so we present it that way.
> Technically, the cards are not written by hand in HTML. They are generated from the FESTIVALS array in data.js, and the dialog uses the native HTML dialog element, which handles focus and the Escape key.”

**Likely questions**
1. *Why is Día de los Muertos on a site about Spanish festivals?* — The assignment covers the Hispanic world. We include it as a contrast and label it clearly as Mexican: UNESCO describes it as a blend of Indigenous rites and Catholic feasts brought in the 16th century.
2. *How does the Learn more button work?* — All buttons share one click listener (event delegation). It reads the festival id from `data-festival`, finds the object with `getFestival(id)`, fills the dialog and calls `showModal()`. On close, focus returns to the button.
3. *What happens on 19 March at Las Fallas?* — *La cremà*: the falla monuments are burned on San José’s feast day, except the *ninot indultat*, saved by public vote.

**Demonstrate live:** open *Learn more* on Las Fallas, scroll, press `Esc` and show focus returning to the button.

**Concepts to know:** `Array.filter()` + `map()` + `join()` to build HTML; template literals; `<dialog>` and `showModal()`; event delegation; `escapeHTML()` and why it matters; `aria-labelledby`.

**Explain without the screen:** San Fermín begins with *el chupinazo* — a rocket from Pamplona’s Town Hall at noon on 6 July — and ends at midnight on 14 July with *“Pobre de mí”*; the feast moved to July in 1591 to coincide with a summer fair.

---

### 2. Pranshu Suresh Gupta — 25BAI1620 · Cuisine

**2-minute explanation**
> “My section is *Sabores de Fiesta* — festival flavours. Food is how people share a celebration, so I researched six dishes: paella valenciana, churros con chocolate, tapas, tortilla española, buñuelos de calabaza and pan de muerto.
> The most important decision was accuracy. Many websites say a dish is the ‘official food’ of a festival without evidence. So every card has a label: *Festival food* when there is a documented link — like buñuelos de calabaza at Las Fallas — *Regional dish* for paella, and *Everyday* for things like tortilla and tapas that you find all over Spain.
> Each card shows the Spanish name, region, main ingredients, why it matters and a Spanish sentence, for example *‘Mojamos los churros en el chocolate caliente’* — we dip the churros in the hot chocolate.
> In code, `renderDishes()` loops through the DISHES array, and the label comes from each dish’s `kind` field, so the rule is enforced by the data.”

**Likely questions**
1. *Is paella eaten only at festivals?* — No. It’s a Valencian regional dish eaten all year; neighbourhood groups often cook it during Fallas and Buñol has held a paella contest during Tomatina week, which is why it appears near festivals.
2. *What does the traditional paella valenciana contain?* — Rice, chicken, rabbit, flat green beans (*ferraura*), butter beans (*garrofó*), tomato, sweet paprika, saffron and olive oil — not seafood.
3. *How is the label colour chosen in code?* — The card’s class is built as `tag-${d.kind}`, so `kind: "festival"` becomes `.tag-festival` in CSS.

**Demonstrate live:** point out the three label types in the legend, then a card of each type.

**Concepts to know:** arrays of objects; `map()` to create cards; CSS Grid (`repeat(3, 1fr)` → 2 → 1 column with media queries); `alt` text; `lang="es"` on Spanish text.

**Explain without the screen:** In the Basque Country tapas-style snacks are called *pintxos*; “ir de tapas” means going from bar to bar with friends — it is a social habit as much as a type of food.

---

### 3. Shreyam Manna — 25BAI1343 · Music & dance

**2-minute explanation**
> “My section is *El Ritmo de la Fiesta*. The main thing I learned is that Spanish festival music is not all flamenco. Flamenco comes from Andalusia and joins three arts: *cante* (singing), *baile* (dance) and *toque* (guitar). UNESCO added it to its Intangible Heritage list in 2010.
> But Valencia’s Fallas have brass bands and the *dolçaina*; Pamplona has its city band and pipers; and in Aragón people dance the *jota*, with castanets and a *rondalla* of guitars and bandurrias, especially during the Fiestas del Pilar.
> My interactive feature is the compás player. Many flamenco styles count in cycles of twelve beats, with accents on 3, 6, 8, 10 and 12. When you press Play, the browser generates a clap sound for each beat — louder on the accents — and highlights the beat. It never plays automatically, and there are no audio files: it uses the Web Audio API.”

**Likely questions**
1. *Where does the sound come from?* — It’s synthesised: `clap()` fills a tiny buffer with random noise that fades out, passes it through a band-pass filter and a gain node. Accented beats are louder and lower.
2. *How is the speed controlled?* — `setInterval(tick, 60000 / bpm)`; 60,000 ms in a minute divided by beats per minute = milliseconds per beat. Moving the slider restarts the interval.
3. *Why did you say flamenco isn’t the music of every festival?* — Because it’s rooted in Andalusia; other regions have their own traditions, like the jota in Aragón and brass bands in Valencia. Saying otherwise would be a stereotype.

**Demonstrate live:** press *Play rhythm*, clap on the accents, change the tempo, press *Stop*.

**Concepts to know:** Web Audio API (`AudioContext`, buffer, filter, gain); `setInterval` / `clearInterval`; `classList.add/remove`; `aria-pressed` on a toggle button; why autoplay is bad for accessibility.

**Explain without the screen:** *Palmas* are rhythmic handclaps; together with footwork (*zapateado*) they keep the *compás*, the shared rhythmic cycle that every performer follows.

---

### 4. Anay Parth — 25BAI1273 · Festival explorer

**2-minute explanation**
> “I built the Festival Explorer. It covers seven festivals: our four main ones plus the Feria de Abril in Seville, the Fiestas del Pilar in Zaragoza and the Carnaval de Barranquilla in Colombia, so you can compare Spain with Latin America.
> You can filter by country, region and theme — food, music, art or traditional celebration. When you choose a country, the region list updates to show only that country’s regions. The calendar shows which months each festival happens in, and clicking a festival shows its full details.
> At the bottom you can compare two festivals side by side on location, timing, traditions, food and music. If you choose the same festival twice, it shows an error message instead.
> The important technical point is that nothing is duplicated: the explorer reads the same FESTIVALS data that the rest of the site uses, and all filters live in one `state` object.”

**Likely questions**
1. *How does filtering work?* — `FESTIVALS.filter(matches)`; `matches()` returns true only if the festival passes the country, region **and** category conditions (`"all"` always passes).
2. *Why isn’t there a real map?* — A real map needs a library and map tiles from an external service. The brief asked us not to fake map interactions, so we show real location data (region, city, country) and a calendar instead.
3. *How is the comparison table built?* — An array of rows, each a label plus a function that returns the cell HTML for one festival; we `map()` the rows into `<tr>` elements for festivals A and B.

**Demonstrate live:** choose *Spain* + *Art* → 1 result (Las Fallas); press *Reset*; compare Las Fallas vs Día de los Muertos.

**Concepts to know:** state object; `Array.filter`, `Set` for unique values; `<select>`, radio buttons and `<label>`; `<table>` with `<caption>`, `scope="col"`/`"row"`; `aria-live` for the result count; form `submit` + `preventDefault()`.

**Explain without the screen:** The Feria de Abril began in 1847 as a livestock fair and became a festive week of *casetas* (tents) where people dance *sevillanas*; its date moves because it is usually two weeks after Easter.

---

### 5. Aritra Biswas — 25BAI1460 · Quiz & vocabulary

**2-minute explanation**
> “I built *¡Pon a prueba tu español!* — the quiz — and *Palabras para celebrar*, the vocabulary section.
> The quiz has 20 original questions about festivals, places, food, music and vocabulary. At the start, I shuffle the questions with the Fisher–Yates algorithm and store that order, so during one attempt no question repeats or gets skipped. When you answer, the options lock, the correct answer turns green with a tick, and your wrong answer is marked with a cross — not only colour, so it’s accessible. Then you see an explanation. At the end you get your score, percentage and a review of every mistake. Restart shuffles again.
> The vocabulary has 57 words. You can search in Spanish or English — even without accents, so *musica* finds *música* — filter by category, switch to flashcards to test yourself, and press Listen to hear the word with the browser’s built-in Spanish voice. No API key is needed.”

**Likely questions**
1. *How is the percentage calculated?* — `Math.round(score / total * 100)`; e.g. 15 of 20 → 75%.
2. *How do you know the right answer after shuffling options?* — Before shuffling, each option becomes `{ text, isCorrect }`, so the correctness travels with the option.
3. *What if the browser has no speech support?* — We check `"speechSynthesis" in window`; if it’s missing, the Listen buttons are not shown and a note explains that search and flashcards still work.

**Demonstrate live:** complete a few questions with number keys `1`–`4`, get one wrong on purpose, finish and show the review; search `fuego`, then turn on flashcards.

**Concepts to know:** Fisher–Yates shuffle; spread operator `[...array]`; keeping state in an object; `disabled` buttons; `hidden` attribute; `focus()` for keyboard users; `String.normalize("NFD")` to remove accents; `SpeechSynthesisUtterance` with `lang = "es-ES"`.

**Explain without the screen:** In flamenco *cante*, *baile* and *toque* mean singing, dancing and guitar playing; and *cempasúchil* (marigold) petals are believed to guide souls to the *ofrenda* during Día de los Muertos.

---

## Testing performed

Automated in headless Chromium (Playwright), serving the folder from a `/fiesta-viva/` sub-path like GitHub Pages:

- No JavaScript errors; no duplicate IDs; every `#anchor` link has a target; every image loads and has `alt`; every input/select has a label.
- Dialog opens, focuses the close button, closes on `Esc` and returns focus.
- Explorer: theme filter, country → region update, reset, details panel, same-festival compare error, 6-row comparison table.
- Quiz completed by keyboard only: 20 unique questions, results/percentage, review count = number of mistakes, restart resets to question 1 with score 0.
- Vocabulary: accent-insensitive search, English search, category filter, flashcard hide/show.
- Compás player starts and stops; team bylines open the correct panel.
- Mobile (390 px): no horizontal scroll, menu opens/closes; desktop (1366 px) visually checked.

Not verifiable in our test environment: Google Fonts loading (blocked there; the fallback fonts were used), real audio output and the speech-synthesis voice. Please check these on your own laptop and phone.
