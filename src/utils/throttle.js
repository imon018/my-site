export function throttle(fn, limit = 300) {
  let lastCall = 0;

  return (...args) => {
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}
