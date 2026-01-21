/* ===============================
   MAIN ENTRY POINT
   Quiz Master ∞
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
   DOM READY – HARD SAFE BINDING
================================ */

window.addEventListener('DOMContentLoaded', () => {
  console.log('main.js loaded');

  // Force start screen visible
  forceScreen('start');

  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', startGame);
  }

  const optionsContainer = document.getElementById('options-container');
  if (optionsContainer) {
    optionsContainer.addEventListener('click', handleOptionClick);
  }
});

/* ===============================
   Force Screen Switch (Fallback)
================================ */

function forceScreen(name) {
  const start = document.getElementById('start-screen');
  const game = document.getElementById('game-screen');
  const result = document.getElementById('result-screen');

  if (start) start.style.display = 'none';
  if (game) game.style.display = 'none';
  if (result) result.style.display = 'none';

  if (name === 'start' && start) start.style.display = 'flex';
  if (name === 'game' && game) game.style.display = 'flex';
  if (name === 'result' && result) result.style.display = 'flex';
}

/* ===============================
   Start Game
================================ */

function startGame() {
  console.log('START CLICKED');
  playSound('click');

  resetAdaptive();
  const weightedQuestions = applyCategoryWeighting(questions);
  initGame(weightedQuestions);

  // Force screen change (CSS-independent)
  forceScreen('game');

  setEmotion('calm');
  renderQuestion();
  startTimer();
}

/* ===============================
   Option Click Handler
================================ */

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
  forceScreen('result');
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

  const finalScore = document.getElementById('final-score-display');
  if (finalScore) {
    finalScore.textContent = GameState.score;
  }

  playSound('win');
}

/* ===============================
   Timer-triggered Game End
================================ */

document.addEventListener('game:end', endGame);
