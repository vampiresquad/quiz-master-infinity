/* ===============================
   MAIN ENTRY POINT
   App Bootstrapper
================================ */

import {
  initGame,
  getCurrentQuestion,
  submitAnswer,
  nextQuestion,
  getProgress,
  getCurrentDifficulty,
  GameState
} from './engine.js';

import {
  renderQuestion,
  showScreen,
  setFeedback,
  setEmotion
} from './ui.js';

import { startTimer, clearTimer, getTimeTaken } from './timer.js';
import { playSound } from './audio.js';

import {
  getDifficultyStory,
  getEndingPhilosophy
} from './story.js';

import { analyzePersonality } from './personality.js';

import {
  trackCategory,
  resetAdaptive,
  applyCategoryWeighting
} from './adaptive.js';

import { questions } from '../data/questions.js';

/* ===============================
   Start Game
================================ */

const startBtn = document.getElementById('start-btn');

if (startBtn) {
  startBtn.addEventListener('click', startGame);
}

function startGame() {
  playSound('click');

  resetAdaptive();
  const weighted = applyCategoryWeighting(questions);
  initGame(weighted);

  showScreen('game');
  setEmotion('calm');

  renderQuestion();
  startTimer();
}

/* ===============================
   Option Click Handler
================================ */

const optionsContainer = document.getElementById('options-container');

if (optionsContainer) {
  optionsContainer.addEventListener('click', handleOptionClick);
}

function handleOptionClick(e) {
  const btn = e.target.closest('.option-btn');
  if (!btn || btn.disabled) return;

  clearTimer();

  const selectedIndex = Number(btn.dataset.index);
  const q = getCurrentQuestion();
  if (!q) return;

  const isCorrect = selectedIndex === q.a;
  const timeTaken = getTimeTaken();

  submitAnswer(isCorrect, timeTaken);
  trackCategory(q.category || 'general', isCorrect);

  const difficulty = getCurrentDifficulty();

  if (isCorrect) {
    playSound('correct');
    setFeedback(getDifficultyStory(difficulty), 'success');
    setEmotion('focus');
  } else {
    playSound('wrong');
    setFeedback(getDifficultyStory(difficulty), 'error');
    setEmotion('panic');
  }

  // Highlight answers
  document.querySelectorAll('.option-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === q.a) b.classList.add('correct');
    if (i === selectedIndex && !isCorrect) b.classList.add('wrong');
  });

  setTimeout(() => {
    const hasNext = nextQuestion();
    if (hasNext) {
      setEmotion('calm');
      renderQuestion();
      startTimer();
    } else {
      endGame();
    }
  }, 1400);
}

/* ===============================
   End Game
================================ */

function endGame() {
  clearTimer();
  showScreen('result');
  setEmotion('dark-story');

  const persona = analyzePersonality();
  const progress = getProgress();

  const philosophy = getEndingPhilosophy(
    GameState.score,
    progress.total
  );

  const finalMsg = document.getElementById('final-message');
  if (finalMsg) {
    finalMsg.innerHTML = `
      <strong>${persona.title}</strong><br>
      ${persona.desc}<br><br>
      <em>${philosophy}</em>
    `;
  }

  playSound('win');
}

/* Timer-triggered end */
document.addEventListener('game:end', endGame);

/* ===============================
   Initial Screen
================================ */

window.addEventListener('load', () => {
  showScreen('start');
});

/* ===============================
   PWA INSTALL HANDLER
================================ */

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

export async function triggerInstall() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
}

window.addEventListener('appinstalled', () => {
  console.log('PWA installed');
});
