/* ===============================
   ADAPTIVE ENGINE
   Mirror Mode
================================ */

import { GameState } from './engine.js';

/* Internal category performance tracker */
const categoryStats = {};

/* ===============================
   Track Answer Performance
================================ */

/**
 * Track correctness by category
 * @param {string} category
 * @param {boolean} isCorrect
 */
export function trackCategory(category, isCorrect) {
  const key = category || 'general';

  if (!categoryStats[key]) {
    categoryStats[key] = { correct: 0, wrong: 0 };
  }

  if (isCorrect) {
    categoryStats[key].correct++;
  } else {
    categoryStats[key].wrong++;
  }
}

/* ===============================
   Adaptive Helpers
================================ */

/* Identify weak categories */
function getWeakCategories() {
  return Object.keys(categoryStats).filter(cat => {
    const { correct, wrong } = categoryStats[cat];
    return wrong > correct;
  });
}

/* ===============================
   Adaptive Sorting Logic
================================ */

/**
 * Reorder question pool based on weakness
 * @param {Array} questionPool
 * @returns {Array}
 */
export function adaptQuestions(questionPool) {
  if (!GameState.adaptive) return questionPool;

  const weakCategories = getWeakCategories();
  if (!weakCategories.length) return questionPool;

  return [...questionPool].sort((a, b) => {
    const ca = a.category || 'general';
    const cb = b.category || 'general';

    const aWeak = weakCategories.includes(ca) ? 1 : 0;
    const bWeak = weakCategories.includes(cb) ? 1 : 0;

    return bWeak - aWeak; // weak first
  });
}

/* ===============================
   Reset Adaptive State
================================ */

export function resetAdaptive() {
  Object.keys(categoryStats).forEach(k => delete categoryStats[k]);
}
