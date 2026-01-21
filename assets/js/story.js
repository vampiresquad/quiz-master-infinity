/* ===============================
   STORY ENGINE
   Narrative Layer
================================ */

import { GameState } from './engine.js';

/* Story blocks */
const story = {
  intro: [
    "তুমি একটি নীরব গ্রন্থাগারে প্রবেশ করেছো…",
    "চারদিকে ধুলো আর পুরনো বইয়ের গন্ধ…",
    "প্রতিটি প্রশ্ন এখানে একেকটা দরজা।"
  ],
  correct: [
    "দরজাটি ধীরে ধীরে খুলে যাচ্ছে…",
    "আলো একটু বাড়লো।",
    "তুমি সঠিক পথে এগোচ্ছো।"
  ],
  wrong: [
    "ভুল পথ বেছে নিয়েছো…",
    "চারপাশে অন্ধকার ঘন হচ্ছে।",
    "দেয়ালগুলো যেন কাছে আসছে।"
  ],
  timeout: [
    "সময় থেমে নেই…",
    "তুমি দেরি করে ফেলেছো।",
    "কিছু সুযোগ হারিয়ে গেল।"
  ],
  end_good: [
    "শেষ দরজাটি খুলে গেল।",
    "তুমি সব প্রশ্নের ঊর্ধ্বে উঠে গেলে।",
    "জ্ঞান তোমাকে গ্রহণ করলো।"
  ],
  end_bad: [
    "গল্প এখানেই থেমে গেল।",
    "সব পথ তোমার জন্য ছিল না।",
    "তবে শিক্ষা রয়ে গেল।"
  ]
};

/* Pick random line */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Get intro story */
export function getIntroStory() {
  if (!GameState.mode.story) return '';
  return pick(story.intro);
}

/* Get feedback story */
export function getStoryByResult(type) {
  if (!GameState.mode.story) return '';
  switch (type) {
    case 'correct':
      return pick(story.correct);
    case 'wrong':
      return pick(story.wrong);
    case 'timeout':
      return pick(story.timeout);
    default:
      return '';
  }
}

/* Get ending story */
export function getEndingStory() {
  if (!GameState.mode.story) return '';
  return GameState.score >= 70
    ? pick(story.end_good)
    : pick(story.end_bad);
}
