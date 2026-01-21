/* ===============================
   UI CONTROLLER
   DOM & Screen Handling
================================ */

import {
  GameState,
  getCurrentQuestion,
  getProgress
} from './engine.js';

/* ===============================
   Cached DOM Elements (Guarded)
================================ */

const screens = {
  start: document.getElementById('start-screen'),
  game: document.getElementById('game-screen'),
  result: document.getElementById('result-screen')
};

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options-container');
const scoreEl = document.getElementById('score');
const qCountEl = document.getElementById('q-count');
const progressFill = document.getElementById('progress');
const feedbackEl = document.getElementById('feedback');

/* ===============================
   Screen Control
================================ */

export function showScreen(name) {
  Object.values(screens).forEach(screen => {
    if (screen) screen.classList.add('hidden');
  });

  if (screens[name]) {
    screens[name].classList.remove('hidden');
  }
}

/* ===============================
   Render Question
================================ */

export function renderQuestion() {
  const data = getCurrentQuestion();
  if (!data || !questionEl || !optionsEl) return;

  // Reset animation safely
  questionEl.classList.remove('question-transition');
  void questionEl.offsetWidth; // force reflow

  // Question text
  questionEl.textContent = data.q;
  questionEl.classList.add('question-transition');

  // Clear options
  optionsEl.innerHTML = '';

  // Render options
  data.o.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn fade-in';
    btn.textContent = opt;
    btn.dataset.index = index;
    optionsEl.appendChild(btn);
  });

  updateStats();
}

/* ===============================
   Stats Update
================================ */

export function updateStats() {
  const progress = getProgress();

  if (scoreEl) scoreEl.textContent = GameState.score;
  if (qCountEl)
    qCountEl.textContent = `${progress.current} / ${progress.total}`;
  if (progressFill)
    progressFill.style.width = `${progress.percent}%`;
}

/* ===============================
   Option Control
================================ */

export function disableOptions() {
  if (!optionsEl) return;
  [...optionsEl.children].forEach(btn => (btn.disabled = true));
}

export function showAnswer(correctIndex, selectedIndex) {
  if (!optionsEl) return;

  [...optionsEl.children].forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) btn.classList.add('correct');
    if (idx === selectedIndex && idx !== correctIndex)
      btn.classList.add('wrong');
  });
}

/* ===============================
   Feedback
================================ */

export function setFeedback(text = '', type = 'normal') {
  if (!feedbackEl) return;

  if (GameState.mode.silent) {
    feedbackEl.textContent = '';
    return;
  }

  feedbackEl.textContent = text;

  feedbackEl.style.color =
    type === 'success'
      ? 'var(--correct)'
      : type === 'error'
      ? 'var(--wrong)'
      : '#ffffff';
}

/* ===============================
   Emotion / Theme Control
================================ */

export function setEmotion(mode) {
  if (!mode) return;

  document.body.classList.remove(
    'calm',
    'focus',
    'panic',
    'dark-story',
    'silent'
  );

  document.body.classList.add(mode);
}
