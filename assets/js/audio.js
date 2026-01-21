/* ===============================
   AUDIO ENGINE
   Web Audio System
================================ */

import { GameState } from './engine.js';

let audioCtx = null;

/* ===============================
   Internal Helpers
================================ */

/* Ensure AudioContext exists & resumed */
function ensureAudioContext() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtx = new Ctx();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

/* ===============================
   Public API
================================ */

/**
 * Play sound effect
 * @param {string} type
 */
export function playSound(type = 'click') {
  // Silent mode guard
  if (GameState.silent) return;

  try {
    ensureAudioContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    switch (type) {
      case 'correct':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
        break;

      case 'wrong':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.35);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
        break;

      case 'win':
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
        osc.start(now);
        osc.stop(now + 1);
        break;

      default: // click
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    }
  } catch (err) {
    // Fail silently – audio must never crash the app
    console.warn('Audio error:', err);
  }
}
