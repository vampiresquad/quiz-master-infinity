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

  // Shuffle questions
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
    GameState.correctStreak++;
  } else {
    GameState.wrongCount++;
    GameState.correctStreak = 0;
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
  return (sum / GameState.timeHistory.length).toFixed(1);
}

/* ===============================
   Difficulty System
================================ */

export function getCurrentDifficulty() {
  const ratio = GameState.index / Math.max(1, totalQuestions);

  if (ratio < 0.33) return 'easy';
  if (ratio < 0.66) return 'medium';
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
