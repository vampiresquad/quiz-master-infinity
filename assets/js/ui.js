/* ===============================
   UI CONTROLLER
   DOM & Screen Handling
================================ */

import {
  GameState,
  getCurrentQuestion,
  getProgress
} from './engine.js';

/* Screen Elements */
const screens = {
  start: document.getElementById('start-screen'),
  game: document.getElementById('game-screen'),
  result: document.getElementById('result-screen')
};

/* Game UI Elements */
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options-container');
const scoreEl = document.getElementById('score');
const qCountEl = document.getElementById('q-count');
const progressFill = document.getElementById('progress');
const feedbackEl = document.getElementById('feedback');

/* Switch Screen */
export function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add('hidden'));
  screens[name].classList.remove('hidden');
}

/* Render Question */
export function renderQuestion() {
  const data = getCurrentQuestion();
  if (!data) return;

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

  // Update stats
  updateStats();
}

/* Update Score, Count, Progress */
export function updateStats() {
  const progress = getProgress();
  scoreEl.textContent = GameState.score;
  qCountEl.textContent = `${progress.current} / ${progress.total}`;
  progressFill.style.width = `${progress.percent}%`;
}

/* Disable all options */
export function disableOptions() {
  [...optionsEl.children].forEach(btn => btn.disabled = true);
}

/* Highlight Correct / Wrong */
export function showAnswer(correctIndex, selectedIndex) {
  const buttons = [...optionsEl.children];
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) btn.classList.add('correct');
    if (idx === selectedIndex && idx !== correctIndex)
      btn.classList.add('wrong');
  });
}

/* Feedback text */
export function setFeedback(text, type = 'normal') {
  if (GameState.mode.silent) {
    feedbackEl.textContent = '';
    return;
  }
  feedbackEl.textContent = text;
  feedbackEl.style.color =
    type === 'success' ? 'var(--correct)' :
    type === 'error' ? 'var(--wrong)' :
    '#fff';
}

/* Emotion trigger */
export function setEmotion(mode) {
  document.body.className = '';
  document.body.classList.add(mode);
}
