export function logSecurity(event) {
  const logs = JSON.parse(localStorage.getItem("dm_security")) || [];

  logs.push({
    event,
    time: new Date().toISOString()
  });

  localStorage.setItem("dm_security", JSON.stringify(logs));
}
