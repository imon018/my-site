export function trackSale(order) {
  const sales = JSON.parse(localStorage.getItem("dm_sales")) || [];

  sales.push(order);

  localStorage.setItem("dm_sales", JSON.stringify(sales));
}
