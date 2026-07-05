export function estimatedDelivery(zone) {
  if (zone === "inside") return "1-2 Days";
  if (zone === "suburban") return "2-3 Days";
  return "3-5 Days";
}
