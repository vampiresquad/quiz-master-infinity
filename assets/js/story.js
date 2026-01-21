/* ===============================
   STORY ENGINE
   Narrative Layer
================================ */

import { GameState } from './engine.js';

/* ===============================
   Core Story Blocks
================================ */

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

/* ===============================
   Helpers
================================ */

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ===============================
   Public Story API
================================ */

export function getIntroStory() {
  if (!GameState.story) return '';
  return pick(story.intro);
}

export function getStoryByResult(type) {
  if (!GameState.story) return '';

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

export function getEndingStory(totalQuestions) {
  if (!GameState.story) return '';

  const ratio = GameState.score / (totalQuestions * 10);
  return ratio >= 0.7
    ? pick(story.end_good)
    : pick(story.end_bad);
}

/* ===============================
   Story by Difficulty
================================ */

const difficultyStory = {
  easy: [
    "শুরুটা সহজ… আলো এখনও তোমার সাথে আছে।",
    "প্রথম দরজাগুলো সহজেই খুলে যাচ্ছে।",
    "তুমি পথটা চিনে নিতে শুরু করেছো।"
  ],
  medium: [
    "এখন প্রশ্নগুলো ভাবতে বাধ্য করছে…",
    "সব সিদ্ধান্ত আর সহজ না।",
    "আলো আর অন্ধকারের সীমা ঝাপসা।"
  ],
  hard: [
    "এখানে আর কোনো সহজ পথ নেই।",
    "নিজের বিশ্বাসকেই প্রশ্ন করতে হবে।",
    "শেষের দরজাগুলো কেবল সাহসীদের জন্য।"
  ]
};

export function getDifficultyStory(level) {
  if (!GameState.story) return '';
  const pool = difficultyStory[level] || difficultyStory.medium;
  return pick(pool);
}

/* ===============================
   Ending Philosophy
================================ */

const philosophy = {
  high: [
    "সব প্রশ্নের উত্তর জানা মানেই জ্ঞানী হওয়া নয়—কখন নীরব থাকতে হয় সেটাও জানতে হয়।",
    "তুমি জিতেছো, কিন্তু মনে রেখো—জ্ঞান দায়িত্বও বয়ে আনে।",
    "উপরে ওঠা কঠিন না, উপরে টিকে থাকাই আসল পরীক্ষা।"
  ],
  mid: [
    "সব উত্তর ঠিক হওয়া জরুরি না—চেষ্টা করাটাই মানুষকে এগিয়ে নেয়।",
    "তুমি পথে আছো, থেমে যেও না।",
    "ভুলের ভেতরেই পরের সঠিক সিদ্ধান্ত লুকিয়ে থাকে।"
  ],
  low: [
    "হারা মানে শেষ নয়—হাল ছেড়ে দেওয়া মানেই শেষ।",
    "আজ পারোনি, কাল পারবে—এই বিশ্বাসটাই সবচেয়ে বড় শক্তি।",
    "সব দরজা তোমার জন্য খোলেনি, কিন্তু কিছু দরজা এখনও অপেক্ষায়।"
  ]
};

export function getEndingPhilosophy(score, totalQuestions) {
  const ratio = score / (totalQuestions * 10);

  let pool = philosophy.low;
  if (ratio >= 0.75) pool = philosophy.high;
  else if (ratio >= 0.4) pool = philosophy.mid;

  return pick(pool);
}
