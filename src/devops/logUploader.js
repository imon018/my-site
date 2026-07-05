export function uploadLogs(logs) {
  console.log("Uploading logs...", logs);

  return {
    success: true,
    uploadedAt: new Date().toISOString(),
  };
}
