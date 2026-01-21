/* ===============================
   ADAPTIVE ENGINE
   Mirror Mode
================================ */

import { GameState } from './engine.js';

/* Performance tracker */
const performance = {};

/* Track answer result by category */
export function trackCategory(category, isCorrect) {
  if (!performance[category]) {
    performance[category] = { correct: 0, wrong: 0 };
  }

  if (isCorrect) {
    performance[category].correct++;
  } else {
    performance[category].wrong++;
  }
}

/* Decide next question bias */
export function getWeakCategories() {
  return Object.keys(performance)
    .filter(cat => performance[cat].wrong > performance[cat].correct);
}

/* Sort questions: weak category first */
export function adaptQuestions(questionPool) {
  if (!GameState.mode.adaptive) return questionPool;

  const weakCats = getWeakCategories();
  if (!weakCats.length) return questionPool;

  return [...questionPool].sort((a, b) => {
    const aWeak = weakCats.includes(a.category) ? -1 : 1;
    const bWeak = weakCats.includes(b.category) ? -1 : 1;
    return aWeak - bWeak;
  });
}

/* Reset tracker */
export function resetAdaptive() {
  Object.keys(performance).forEach(k => delete performance[k]);
}
