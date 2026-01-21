/* ===============================
   PERSONALITY ANALYZER
   Mind Reading Layer
================================ */

import { GameState, getAverageTime } from './engine.js';

/* Personality rules */
export function analyzePersonality() {
  const avgTime = getAverageTime();
  const wrong = GameState.wrongCount;
  const streak = GameState.correctStreak;
  const usedLifeline = GameState.lifelineUsed;

  // Silent mode override
  if (GameState.mode.silent) {
    return {
      title: "Silent Strategist 😶",
      desc: "চাপের মধ্যে চুপচাপ সিদ্ধান্ত নিতে পারো। তুমি শব্দ ছাড়াই যুদ্ধ জেতো।"
    };
  }

  // Lightning fast
  if (avgTime <= 5 && wrong <= 2) {
    return {
      title: "Lightning Thinker ⚡",
      desc: "তুমি দ্রুত ভাবো, দ্রুত সিদ্ধান্ত নাও। সময় তোমার শত্রু না।"
    };
  }

  // Strategic survivor
  if (usedLifeline && wrong <= 3) {
    return {
      title: "Strategic Survivor 🧠",
      desc: "তুমি জানো কখন লড়বে আর কখন বাঁচতে হবে। কৌশলই তোমার শক্তি।"
    };
  }

  // Risk taker
  if (wrong >= 5 && avgTime < 8) {
    return {
      title: "Risk Taker 🔥",
      desc: "তুমি ঝুঁকি নিতে ভয় পাও না। সব সিদ্ধান্ত নিখুঁত না, কিন্তু সাহসী।"
    };
  }

  // Calm observer
  return {
    title: "Calm Observer 🌊",
    desc: "তুমি ধীরে ভাবো, গভীরভাবে বিচার করো। সময় নিয়ে সঠিক পথ বেছে নাও।"
  };
}
