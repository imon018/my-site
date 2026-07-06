const REQUIRED = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

export function checkEnv() {
  const missing = REQUIRED.filter((k) => !import.meta.env[k]);

  if (missing.length) {
    console.error("Missing required environment variables:", missing);
    return missing;
  }

  return [];
}
