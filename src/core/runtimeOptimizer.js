export function optimizeRuntime() {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      console.log("Runtime optimized");
    });
  }
}
