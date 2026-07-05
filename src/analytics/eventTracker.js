export function trackEvent(name, data = {}) {
  const logs = JSON.parse(localStorage.getItem("dm_events")) || [];

  logs.push({
    name,
    data,
    time: new Date().toISOString()
  });

  localStorage.setItem("dm_events", JSON.stringify(logs));
}
