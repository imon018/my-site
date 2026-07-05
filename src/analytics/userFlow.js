export function trackUserFlow(step) {
  const flow = JSON.parse(localStorage.getItem("dm_flow")) || [];

  flow.push({
    step,
    time: new Date().toISOString()
  });

  localStorage.setItem("dm_flow", JSON.stringify(flow));
}
