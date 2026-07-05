export function calculateDeliveryFee(zone = "inside") {
  switch (zone) {
    case "inside":
      return 80;
    case "suburban":
      return 100;
    case "outside":
      return 120;
    default:
      return 100;
  }
}
