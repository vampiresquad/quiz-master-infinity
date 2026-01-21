/* ===============================
   MAIN ENTRY POINT
   App Bootstrapper
================================ */

import { initGame, getCurrentQuestion, submitAnswer, nextQuestion } from './engine.js';
import { renderQuestion, showScreen, setFeedback, setEmotion } from './ui.js';
import { startTimer, clearTimer, getTimeTaken } from './timer.js';
import { playSound } from './audio.js';
import { getIntroStory, getStoryByResult, getEndingStory } from './story.js';
import { analyzePersonality } from './personality.js';
import { trackCategory, resetAdaptive } from './adaptive.js';

import { questions } from '../data/questions.js';

/* Start Button */
const startBtn = document.getElementById('start-btn');
if (startBtn) {
  startBtn.addEventListener('click', startGame);
}

/* Start Game */
function startGame() {
  playSound('click');
  resetAdaptive();
  initGame(questions);
  showScreen('game');
  setEmotion('calm');

  renderQuestion();
  startTimer();
}

/* Handle option click (event delegation) */
const optionsContainer = document.getElementById('options-container');
if (optionsContainer) {
  optionsContainer.addEventListener('click', handleOptionClick);
}

function handleOptionClick(e) {
  const btn = e.target.closest('.option-btn');
  if (!btn || btn.disabled) return;

  clearTimer();

  const selectedIndex = Number(btn.dataset.index);
  const q = getCurrentQuestion();
  const isCorrect = selectedIndex === q.a;
  const timeTaken = getTimeTaken();

  submitAnswer(isCorrect, timeTaken);
  trackCategory(q.category || 'general', isCorrect);

  if (isCorrect) {
    playSound('correct');
    setFeedback(getStoryByResult('correct'), 'success');
    setEmotion('focus');
  } else {
    playSound('wrong');
    setFeedback(getStoryByResult('wrong'), 'error');
    setEmotion('panic');
  }

  // Show correct / wrong
  document.querySelectorAll('.option-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === q.a) b.classList.add('correct');
    if (i === selectedIndex && !isCorrect) b.classList.add('wrong');
  });

  setTimeout(() => {
    const hasNext = nextQuestion();
    if (hasNext) {
      setEmotion('calm');
      renderQuestion();
      startTimer();
    } else {
      endGame();
    }
  }, 1400);
}

/* End Game */
function endGame() {
  clearTimer();
  showScreen('result');
  setEmotion('dark-story');

  const persona = analyzePersonality();
  const endingStory = getEndingStory();

  document.getElementById('final-score-display').textContent =
    document.getElementById('score').textContent;

  document.getElementById('final-message').innerHTML = `
    <strong>${persona.title}</strong><br>
    ${persona.desc}<br><br>
    <em>${endingStory}</em>
  `;

  playSound('win');
}

/* Listen game end from timer */
document.addEventListener('game:end', endGame);

/* Greeting on load */
window.addEventListener('load', () => {
  showScreen('start');
});
