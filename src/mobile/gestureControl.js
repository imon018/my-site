export function detectSwipe(startX, endX) {
  if (endX - startX > 80) return "right";
  if (startX - endX > 80) return "left";
  return null;
}
