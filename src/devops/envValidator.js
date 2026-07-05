const REQUIRED_ENV = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

export function validateEnv() {
  const missing = REQUIRED_ENV.filter(
    (key) => !import.meta.env[key]
  );

  if (missing.length) {
    console.warn("Missing environment variables:", missing);
    return false;
  }

  return true;
}
