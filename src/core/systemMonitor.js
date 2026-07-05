export function getSystemStatus() {
  return {
    online: navigator.onLine,
    language: navigator.language,
    platform: navigator.platform,
    timestamp: new Date().toISOString()
  };
}
