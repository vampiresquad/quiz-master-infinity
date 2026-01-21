/* ===============================
   PERSONALITY ANALYZER
   Mind Reading Layer
================================ */

import { GameState, getAverageTime } from './engine.js';

/**
 * Analyze player personality based on gameplay
 * @returns {{title: string, desc: string}}
 */
export function analyzePersonality() {
  const avgTime = getAverageTime();
  const wrong = GameState.wrong || 0;
  const streak = GameState.streak || 0;
  const usedLifeline = GameState.lifeline || false;

  /* Silent mode override */
  if (GameState.silent) {
    return {
      title: "Silent Strategist 😶",
      desc: "চাপের মধ্যে চুপচাপ সিদ্ধান্ত নিতে পারো। তুমি শব্দ ছাড়াই যুদ্ধ জেতো।"
    };
  }

  /* Lightning fast thinker */
  if (avgTime <= 5 && wrong <= 2) {
    return {
      title: "Lightning Thinker ⚡",
      desc: "তুমি দ্রুত ভাবো, দ্রুত সিদ্ধান্ত নাও। সময় তোমার শত্রু না।"
    };
  }

  /* Strategic survivor */
  if (usedLifeline && wrong <= 3) {
    return {
      title: "Strategic Survivor 🧠",
      desc: "তুমি জানো কখন লড়বে আর কখন বাঁচতে হবে। কৌশলই তোমার শক্তি।"
    };
  }

  /* Risk taker */
  if (wrong >= 5 && avgTime < 8) {
    return {
      title: "Risk Taker 🔥",
      desc: "তুমি ঝুঁকি নিতে ভয় পাও না। সব সিদ্ধান্ত নিখুঁত না, কিন্তু সাহসী।"
    };
  }

  /* Calm observer (default) */
  return {
    title: "Calm Observer 🌊",
    desc: "তুমি ধীরে ভাবো, গভীরভাবে বিচার করো। সময় নিয়ে সঠিক পথ বেছে নাও।"
  };
}
