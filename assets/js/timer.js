/* ===============================
   TIMER SYSTEM
   Countdown & Pressure
================================ */

import { GameState, submitAnswer, nextQuestion } from './engine.js';
import { renderQuestion, setFeedback, setEmotion } from './ui.js';

let timerInterval = null;
let timeLeft = 15;
let startTime = 0;

/* Start Timer */
export function startTimer(duration = 15) {
  clearTimer();
  timeLeft = duration;
  startTime = Date.now();

  const timerEl = document.getElementById('timer');
  timerEl.textContent = timeLeft;
  timerEl.classList.remove('timer-panic');

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    // Panic mode (last 5 seconds)
    if (timeLeft <= 5) {
      timerEl.classList.add('timer-panic');
      setEmotion('panic');
    }

    // Time over
    if (timeLeft <= 0) {
      clearTimer();
      handleTimeOut();
    }
  }, 1000);
}

/* Stop Timer */
export function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

/* When time runs out */
function handleTimeOut() {
  const timeTaken = Math.round((Date.now() - startTime) / 1000);
  submitAnswer(false, timeTaken);

  setFeedback('সময় শেষ! 😢', 'error');

  // Auto move to next question
  setTimeout(() => {
    const hasNext = nextQuestion();
    if (hasNext) {
      setEmotion('calm');
      renderQuestion();
      startTimer();
    } else {
      // Game end will be handled later
      document.dispatchEvent(new Event('game:end'));
    }
  }, 1200);
}

/* Get time taken (for correct/wrong answer) */
export function getTimeTaken() {
  return Math.round((Date.now() - startTime) / 1000);
}
