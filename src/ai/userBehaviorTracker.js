export function trackEvent(event, data) {
  const logs = JSON.parse(localStorage.getItem("dm_logs")) || [];

  logs.push({
    event,
    data,
    time: new Date().toISOString()
  });

  localStorage.setItem("dm_logs", JSON.stringify(logs));
}
