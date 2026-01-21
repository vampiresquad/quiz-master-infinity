/* ===============================
   GAME ENGINE
   Quiz Master ∞
================================ */

export const GameState = {
  index: 0,
  score: 0,
  wrong: 0,
  streak: 0,
  lifeline: false,
  timeHistory: [],

  mode: {
    silent: false,
    story: true,
    adaptive: true
  },

  reset() {
    this.index = 0;
    this.score = 0;
    this.wrong = 0;
    this.streak = 0;
    this.lifeline = false;
    this.timeHistory = [];
  }
};

let questions = [];
let totalQuestions = 0;

export function initGame(questionPool) {
  GameState.reset();
  questions = shuffle([...questionPool]);
  totalQuestions = questions.length;
}

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
  return (
    GameState.timeHistory.reduce((a, b) => a + b, 0) /
    GameState.timeHistory.length
  );
}

export function getCurrentDifficulty() {
  const p = GameState.index / Math.max(1, totalQuestions);
  if (p < 0.33) return 'easy';
  if (p < 0.66) return 'medium';
  return 'hard';
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
