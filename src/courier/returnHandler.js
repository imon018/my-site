export function canReturn(orderDate) {
  const order = new Date(orderDate);
  const today = new Date();

  const days =
    (today - order) / (1000 * 60 * 60 * 24);

  return days <= 7;
}
