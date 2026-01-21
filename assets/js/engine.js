/* ===============================
   GAME ENGINE
   Quiz Master ∞
================================ */

/* ===============================
   Global Game State
================================ */

export const GameState = {
  index: 0,
  score: 0,
  wrong: 0,
  streak: 0,
  lifeline: false,
  timeHistory: [],

  /* Modes */
  silent: false,
  story: true,
  adaptive: true,

  reset() {
    this.index = 0;
    this.score = 0;
    this.wrong = 0;
    this.streak = 0;
    this.lifeline = false;
    this.timeHistory = [];
  }
};

/* ===============================
   Internal Engine Data
================================ */

let questions = [];
let totalQuestions = 0;

/* ===============================
   Game Initialization
================================ */

export function initGame(questionPool) {
  GameState.reset();

  // Shuffle question pool
  questions = shuffle([...questionPool]);
  totalQuestions = questions.length;
}

/* ===============================
   Question Handling
================================ */

export function getCurrentQuestion() {
  return questions[GameState.index] || null;
}

export function submitAnswer(isCorrect, timeTaken) {
  GameState.timeHistory.push(timeTaken);

  if (isCorrect) {
    GameState.score += 10;
    GameState.streak++;
  } else {
    GameState.wrong++;
    GameState.streak = 0;
  }
}

export function nextQuestion() {
  GameState.index++;
  return GameState.index < totalQuestions;
}

/* ===============================
   Progress & Stats
================================ */

export function getProgress() {
  return {
    current: GameState.index + 1,
    total: totalQuestions,
    percent: totalQuestions
      ? (GameState.index / totalQuestions) * 100
      : 0
  };
}

export function getAverageTime() {
  if (!GameState.timeHistory.length) return 0;
  const sum = GameState.timeHistory.reduce((a, b) => a + b, 0);
  return sum / GameState.timeHistory.length;
}

/* ===============================
   Difficulty System
================================ */

export function getCurrentDifficulty() {
  const progress = GameState.index / Math.max(1, totalQuestions);

  if (progress < 0.33) return 'easy';
  if (progress < 0.66) return 'medium';
  return 'hard';
}

/* ===============================
   Utilities
================================ */

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
