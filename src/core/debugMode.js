export const DEBUG = import.meta.env.DEV;

export function debug(...args) {
  if (DEBUG) {
    console.log("[DEBUG]", ...args);
  }
}
