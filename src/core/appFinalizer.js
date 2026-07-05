import { initializeApp } from "./appInitializer";
import { optimizeRuntime } from "./runtimeOptimizer";

export function finalizeApp() {
  initializeApp();
  optimizeRuntime();

  console.log("✅ Dream Mode ready for production");
}
