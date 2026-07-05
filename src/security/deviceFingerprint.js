export function getDeviceFingerprint() {
  return btoa(
    navigator.userAgent +
    screen.width +
    screen.height
  );
}
