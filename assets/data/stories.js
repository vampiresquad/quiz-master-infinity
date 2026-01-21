/* ===============================
   STORIES MODULE
   Lightweight Narrative Layer
================================ */

import { GameState } from './engine.js';

/* ===============================
   Story Pools
================================ */

const story = {
  intro: [
    "তুমি একটি অন্ধকার গ্রন্থাগারে ঢুকলে…",
    "নীরবতার মাঝে বইয়ের গন্ধ ভেসে আসছে…",
    "প্রতিটি প্রশ্ন যেন একেকটি দরজা।"
  ],
  correct: [
    "দরজাটি ধীরে খুলে গেল…",
    "আলো একটু একটু করে বাড়ছে…",
    "তুমি সঠিক পথে এগোচ্ছো।"
  ],
  wrong: [
    "ভুল পথ… অন্ধকার বাড়ছে…",
    "দেয়ালগুলো যেন কাছে চলে আসছে…",
    "ভুলের মূল্য দিতে হচ্ছে।"
  ],
  end: [
    "শেষ অধ্যায় শেষ হলো…",
    "সব গল্পেরই একটি পরিণতি থাকে।",
    "জ্ঞানই শেষ আশ্রয়।"
  ]
};

/* ===============================
   Helpers
================================ */

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ===============================
   Public API
================================ */

export function getIntroStory() {
  if (!GameState.story) return '';
  return pick(story.intro);
}

export function getStoryByResult(type) {
  if (!GameState.story) return '';

  if (type === 'correct') return pick(story.correct);
  if (type === 'wrong') return pick(story.wrong);

  return '';
}

export function getEndingStory() {
  if (!GameState.story) return '';
  return pick(story.end);
}
