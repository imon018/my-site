export async function getTrackingStatus(trackingId) {
  return {
    trackingId,
    status: "Processing",
    updatedAt: new Date().toISOString()
  };
}
