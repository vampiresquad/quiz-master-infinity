import {
  GameState,
  getCurrentQuestion,
  getProgress
} from './engine.js';

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

export function showScreen(name) {
  Object.values(screens).forEach(s => s?.classList.add('hidden'));
  screens[name]?.classList.remove('hidden');
}

export function renderQuestion() {
  const q = getCurrentQuestion();
  if (!q) return;

  questionEl.textContent = q.q;
  optionsEl.innerHTML = '';

  q.o.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.dataset.index = i;
    optionsEl.appendChild(btn);
  });

  updateStats();
}

function updateStats() {
  const p = getProgress();
  scoreEl.textContent = GameState.score;
  qCountEl.textContent = `${p.current} / ${p.total}`;
  progressFill.style.width = `${p.percent}%`;
}

export function setFeedback(text, type) {
  if (GameState.mode.silent) return;
  feedbackEl.textContent = text;
  feedbackEl.style.color =
    type === 'success'
      ? 'var(--correct)'
      : type === 'error'
      ? 'var(--wrong)'
      : '#fff';
}

export function setEmotion(mode) {
  document.body.className = '';
  document.body.classList.add(mode);
}
