export function supportsTouch() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}
