import { validateEnv } from "./envValidator";

export function runBuildChecks() {
  const envReady = validateEnv();

  if (!envReady) {
    throw new Error("Build failed: Missing environment variables.");
  }

  console.log("Build checks passed.");
}
