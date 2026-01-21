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
/* ===============================
   CATEGORY WEIGHTING
   Smart Mirror Mode
================================ */

/* Calculate weight for each category */
export function getCategoryWeights() {
  const weights = {};

  Object.keys(performance).forEach(cat => {
    const { correct, wrong } = performance[cat];
    const total = correct + wrong || 1;

    // More wrong = higher weight
    weights[cat] = wrong / total;
  });

  return weights;
}

/* Reorder question pool by weight */
export function applyCategoryWeighting(pool) {
  if (!GameState.mode.adaptive) return pool;

  const weights = getCategoryWeights();

  return [...pool].sort((a, b) => {
    const wa = weights[a.category] ?? 0;
    const wb = weights[b.category] ?? 0;
    return wb - wa; // higher weight first
  });
}
