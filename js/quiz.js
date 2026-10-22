/* ==========================================================================
   FIESTA VIVA — quiz.js  (Aritra Biswas)
   "¡Pon a prueba tu español!" — multiple-choice quiz.

   How scoring works
   1. startQuiz() makes a shuffled COPY of QUIZ_QUESTIONS (Fisher–Yates) and
      shuffles each question's options. The order is fixed for that attempt,
      so no question can repeat or be skipped.
   2. Each option remembers whether it is correct (isCorrect), so shuffling
      the options can never break the answer key.
   3. selectAnswer() locks the options, adds 1 to the score if correct and
      saves wrong answers for the review screen.
   4. showResults() shows score, percentage = Math.round(score / total * 100)
      and every incorrect answer with its explanation.
   ========================================================================== */

/** Fisher–Yates shuffle: returns a NEW array in random order (fair: every order is equally likely). */
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function initQuiz() {
  const el = {
    start: document.getElementById("quiz-start"),
    startBtn: document.getElementById("quiz-start-btn"),
    totalLabel: document.getElementById("quiz-total-label"),
    question: document.getElementById("quiz-question"),
    progressText: document.getElementById("quiz-progress-text"),
    progress: document.getElementById("quiz-progress"),
    progressBar: document.getElementById("quiz-progress-bar"),
    score: document.getElementById("quiz-score"),
    topic: document.getElementById("quiz-topic"),
    qText: document.getElementById("quiz-q-text"),
    options: document.getElementById("quiz-options"),
    feedback: document.getElementById("quiz-feedback"),
    next: document.getElementById("quiz-next"),
    results: document.getElementById("quiz-results"),
    resultsTitle: document.getElementById("quiz-results-title"),
    finalScore: document.getElementById("quiz-final-score"),
    finalMsg: document.getElementById("quiz-final-msg"),
    review: document.getElementById("quiz-review"),
    restart: document.getElementById("quiz-restart")
  };
  if (Object.values(el).some((node) => !node)) return;
  if (!Array.isArray(QUIZ_QUESTIONS) || QUIZ_QUESTIONS.length === 0) return;

  // Validate the question bank once, so a typo in data.js shows a clear warning.
  const validQuestions = QUIZ_QUESTIONS.filter((q) => {
    const ok = Array.isArray(q.options) && q.options.length === 4 && q.answer >= 0 && q.answer < 4;
    if (!ok) console.warn(`Quiz question ${q.id} is invalid and was skipped.`);
    return ok;
  });

  const total = validQuestions.length;
  el.totalLabel.textContent = total;
  el.progress.setAttribute("aria-valuemax", total);

  // Everything about the current attempt lives here.
  let quiz = { order: [], index: 0, score: 0, answered: false, mistakes: [] };

  function showScreen(screen) {
    [el.start, el.question, el.results].forEach((s) => { s.hidden = s !== screen; });
  }

  function startQuiz() {
    quiz = {
      // Shuffle question order and each question's options ONCE per attempt
      order: shuffle(validQuestions).map((q) => ({
        ...q,
        shuffledOptions: shuffle(q.options.map((text, i) => ({ text, isCorrect: i === q.answer })))
      })),
      index: 0,
      score: 0,
      answered: false,
      mistakes: []
    };
    showScreen(el.question);
    renderQuestion();
  }

  function renderQuestion() {
    const q = quiz.order[quiz.index];
    quiz.answered = false;

    el.progressText.textContent = `Question ${quiz.index + 1} of ${total} · Pregunta ${quiz.index + 1}`;
    el.progressBar.style.width = `${(quiz.index / total) * 100}%`;
    el.progress.setAttribute("aria-valuenow", quiz.index);
    el.score.textContent = quiz.score;
    el.topic.textContent = q.topic;
    el.qText.textContent = q.question;
    el.feedback.innerHTML = "";
    el.next.hidden = true;

    el.options.innerHTML = q.shuffledOptions.map((opt, i) => `
      <button class="option" type="button" data-index="${i}">
        <span class="option-key" aria-hidden="true">${i + 1}</span>
        <span class="option-text">${escapeHTML(opt.text)}</span>
        <span class="option-mark"></span>
      </button>`).join("");

    el.qText.focus();
  }

  function selectAnswer(choiceIndex) {
    if (quiz.answered) return;            // ignore double clicks
    const q = quiz.order[quiz.index];
    const chosen = q.shuffledOptions[choiceIndex];
    if (!chosen) return;
    quiz.answered = true;

    const correct = q.shuffledOptions.find((o) => o.isCorrect);
    if (chosen.isCorrect) {
      quiz.score++;
    } else {
      quiz.mistakes.push({ question: q.question, chosen: chosen.text, correct: correct.text, explanation: q.explanation });
    }

    // Mark the buttons with colour AND text, so meaning never relies on colour alone
    [...el.options.children].forEach((btn, i) => {
      const opt = q.shuffledOptions[i];
      btn.disabled = true;
      const mark = btn.querySelector(".option-mark");
      if (opt.isCorrect) { btn.classList.add("is-correct"); mark.textContent = "✓ Correct answer"; }
      else if (i === choiceIndex) { btn.classList.add("is-wrong"); mark.textContent = "✗ Your answer"; }
      else btn.classList.add("is-dimmed");
    });

    el.score.textContent = quiz.score;
    el.progressBar.style.width = `${((quiz.index + 1) / total) * 100}%`;
    el.progress.setAttribute("aria-valuenow", quiz.index + 1);

    el.feedback.innerHTML = chosen.isCorrect
      ? `<div class="feedback-box ok"><p class="feedback-title" lang="es">¡Correcto! <span lang="en">Correct.</span></p><p>${escapeHTML(q.explanation)}</p></div>`
      : `<div class="feedback-box bad"><p class="feedback-title"><span lang="es">Incorrecto.</span> The correct answer is “${escapeHTML(correct.text)}”.</p><p>${escapeHTML(q.explanation)}</p></div>`;

    const isLast = quiz.index === total - 1;
    el.next.textContent = isLast ? "See my results" : "Next question";
    el.next.hidden = false;
    el.next.focus();
  }

  function nextQuestion() {
    if (!quiz.answered) return;           // cannot skip a question
    if (quiz.index < total - 1) {
      quiz.index++;
      renderQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    const percent = Math.round((quiz.score / total) * 100);
    el.finalScore.textContent = `${quiz.score} / ${total} · ${percent}%`;

    let message;
    if (percent >= 90) message = "¡Excelente! Excellent — you clearly explored every section.";
    else if (percent >= 70) message = "¡Muy bien! Very good — just a few details to review.";
    else if (percent >= 50) message = "¡Bien hecho! Well done — review the answers below and try again.";
    else message = "¡Ánimo! Keep going — explore the site and try another attempt.";
    el.finalMsg.textContent = message;

    el.review.innerHTML = quiz.mistakes.length === 0
      ? `<p class="feedback-box ok">No mistakes to review — <span lang="es">¡perfecto!</span></p>`
      : `<h4>Review your incorrect answers (${quiz.mistakes.length})</h4>
         <ol class="review-list">${quiz.mistakes.map((m) => `
           <li>
             <p class="review-q">${escapeHTML(m.question)}</p>
             <p>Your answer: <span class="ans-wrong">✗ ${escapeHTML(m.chosen)}</span></p>
             <p>Correct answer: <span class="ans-right">✓ ${escapeHTML(m.correct)}</span></p>
             <p class="muted">${escapeHTML(m.explanation)}</p>
           </li>`).join("")}
         </ol>`;

    showScreen(el.results);
    el.resultsTitle.focus();
  }

  /* ---------- Event listeners ---------- */
  el.startBtn.addEventListener("click", startQuiz);
  el.restart.addEventListener("click", startQuiz);
  el.next.addEventListener("click", nextQuestion);
  el.options.addEventListener("click", (e) => {
    const btn = e.target.closest(".option");
    if (btn) selectAnswer(Number(btn.dataset.index));
  });

  // Number keys 1–4 choose an option while the question screen is visible
  document.addEventListener("keydown", (e) => {
    if (el.question.hidden || quiz.answered) return;
    if (!el.question.contains(document.activeElement)) return; // only while the quiz has focus
    const n = Number(e.key);
    if (n >= 1 && n <= 4) selectAnswer(n - 1);
  });

  showScreen(el.start);
}
