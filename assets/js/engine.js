/* ===============================
   GAME ENGINE
   Quiz Master ∞
================================ */

export const GameState = {
  index: 0,
  score: 0,
  timeHistory: [],
  wrongCount: 0,
  correctStreak: 0,
  lifelineUsed: false,

  mode: {
    silent: false,
    story: true,
    adaptive: true
  },

  reset() {
    this.index = 0;
    this.score = 0;
    this.timeHistory = [];
    this.wrongCount = 0;
    this.correctStreak = 0;
    this.lifelineUsed = false;
  }
};

// Internal engine data
let questions = [];
let totalQuestions = 0;

import { applyDifficultyCurve } from './engine.js';

export function initGame(questionPool) {
  GameState.reset();

  // Shuffle first
  let shuffled = shuffle([...questionPool]);

  // Apply difficulty curve
  questions = applyDifficultyCurve(shuffled);

  totalQuestions = questions.length;
}

/* Get current question */
export function getCurrentQuestion() {
  return questions[GameState.index];
}

/* Submit answer */
export function submitAnswer(isCorrect, timeTaken) {
  GameState.timeHistory.push(timeTaken);

  if (isCorrect) {
    GameState.score += 10;
    GameState.correctStreak++;
  } else {
    GameState.wrongCount++;
    GameState.correctStreak = 0;
  }
}

/* Move to next question */
export function nextQuestion() {
  GameState.index++;
  return GameState.index < totalQuestions;
}

/* Get progress */
export function getProgress() {
  return {
    current: GameState.index + 1,
    total: totalQuestions,
    percent: (GameState.index / totalQuestions) * 100
  };
}

/* Average answer time */
export function getAverageTime() {
  if (!GameState.timeHistory.length) return 0;
  const sum = GameState.timeHistory.reduce((a, b) => a + b, 0);
  return (sum / GameState.timeHistory.length).toFixed(1);
}

/* Shuffle utility (Fisher–Yates) */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
/* ===============================
   DIFFICULTY CURVE
   Easy → Medium → Hard
================================ */

/* Get difficulty by progress */
export function getCurrentDifficulty() {
  const progress = GameState.index / Math.max(1, totalQuestions);

  if (progress < 0.33) return 'easy';
  if (progress < 0.66) return 'medium';
  return 'hard';
}

/* Filter questions by difficulty */
export function applyDifficultyCurve(pool) {
  const level = getCurrentDifficulty();

  const filtered = pool.filter(q => q.difficulty === level);

  // Fallback if not enough questions
  return filtered.length ? filtered : pool;
}
