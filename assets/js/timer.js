/* ===============================
   TIMER SYSTEM
   Countdown & Pressure
================================ */

import { submitAnswer, nextQuestion } from './engine.js';
import { renderQuestion } from './ui.js';

let timerInterval = null;
let timeLeft = 15;
let startTime = 0;

/* ===============================
   Start Timer
================================ */

export function startTimer(duration = 15) {
  clearTimer();
  timeLeft = duration;
  startTime = Date.now();

  const timerEl = document.getElementById('timer');
  if (timerEl) {
    timerEl.textContent = timeLeft;
    timerEl.classList.remove('timer-panic');
  }

  timerInterval = setInterval(() => {
    timeLeft--;

    if (timerEl) {
      timerEl.textContent = timeLeft;

      if (timeLeft <= 5) {
        timerEl.classList.add('timer-panic');
      }
    }

    if (timeLeft <= 0) {
      clearTimer();
      handleTimeout();
    }
  }, 1000);
}

/* ===============================
   Stop Timer
================================ */

export function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

/* ===============================
   Timeout Handler
================================ */

function handleTimeout() {
  const timeTaken = Math.round((Date.now() - startTime) / 1000);

  // Mark as wrong due to timeout
  submitAnswer(false, timeTaken);

  // Notify UI / main layer
  document.dispatchEvent(
    new CustomEvent('game:timeout')
  );

  setTimeout(() => {
    const hasNext = nextQuestion();

    if (hasNext) {
      renderQuestion();
      startTimer();
    } else {
      document.dispatchEvent(
        new CustomEvent('game:end')
      );
    }
  }, 1200);
}

/* ===============================
   Utility
================================ */

export function getTimeTaken() {
  return Math.round((Date.now() - startTime) / 1000);
}
