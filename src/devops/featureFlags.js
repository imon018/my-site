export const FEATURES = {
  AI: true,
  ANALYTICS: true,
  COURIER: true,
  PAYMENT: false,
};

export function isFeatureEnabled(name) {
  return FEATURES[name] === true;
}
