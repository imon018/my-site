export function hydrateState(defaultState) {
  const saved = localStorage.getItem("dm_state");

  if (!saved) return defaultState;

  return JSON.parse(saved);
}
