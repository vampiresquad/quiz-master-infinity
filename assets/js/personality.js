export function analyze(state) {
  if(state.timeAvg < 6 && state.wrong < 2)
    return "Lightning Thinker ⚡";
  if(state.lifeline)
    return "Strategic Survivor 🧠";
  return "Calm Observer 🌊";
}
