export function healthCheck() {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    online: navigator.onLine,
  };
}
