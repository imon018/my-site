export function cleanupStorage() {
  const keys = Object.keys(localStorage);

  keys.forEach((key) => {
    if (key.startsWith("temp_")) {
      localStorage.removeItem(key);
    }
  });
}
