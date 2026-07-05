export function validateSecureContext() {
  return {
    secure: window.isSecureContext,
    protocol: location.protocol
  };
}
