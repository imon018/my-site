export function getDeploymentInfo() {
  return {
    environment: import.meta.env.MODE,
    production: import.meta.env.PROD,
    development: import.meta.env.DEV,
    buildTime: new Date().toISOString(),
  };
}
