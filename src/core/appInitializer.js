export function initializeApp() {
  console.log("🚀 Dream Mode initialized");

  return {
    initialized: true,
    startedAt: new Date().toISOString(),
  };
}
