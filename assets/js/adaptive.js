import { GameState } from './engine.js';

const performance = {};

export function trackCategory(category, isCorrect) {
  if (!performance[category]) {
    performance[category] = { correct: 0, wrong: 0 };
  }
  isCorrect
    ? performance[category].correct++
    : performance[category].wrong++;
}

export function resetAdaptive() {
  Object.keys(performance).forEach(k => delete performance[k]);
}

export function applyCategoryWeighting(pool) {
  if (!GameState.mode.adaptive) return pool;

  return [...pool].sort((a, b) => {
    const wa = performance[a.category]?.wrong || 0;
    const wb = performance[b.category]?.wrong || 0;
    return wb - wa;
  });
}
