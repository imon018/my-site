export async function requestNotificationPermission() {
  if (!("Notification" in window)) return;

  const permission = await Notification.requestPermission();

  return permission;
}
