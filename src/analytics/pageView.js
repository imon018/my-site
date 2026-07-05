export function trackPageView(page) {
  const views = JSON.parse(localStorage.getItem("dm_pageviews")) || [];

  views.push({
    page,
    time: new Date().toISOString()
  });

  localStorage.setItem("dm_pageviews", JSON.stringify(views));
}
