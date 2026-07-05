export function getFunnel() {
  const views = JSON.parse(localStorage.getItem("dm_pageviews")) || [];
  const carts = JSON.parse(localStorage.getItem("dm_cart_events")) || [];
  const sales = JSON.parse(localStorage.getItem("dm_sales")) || [];

  return {
    views: views.length,
    carts: carts.length,
    sales: sales.length
  };
}
