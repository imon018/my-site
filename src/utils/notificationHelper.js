import {
  notifyUser,
  notifyAdmin,
} from "../services/notificationService";

/*
  NOTE:
  This file used to write notification docs directly to Firestore
  with its own (incompatible) shape — it never set `isDeleted`,
  and it silently dropped `actionUrl` / `priority`.

  The realtime listeners in `notificationService.js`
  (listenUserNotifications / listenAdminNotifications) filter on
  `isDeleted == false`. Firestore excludes documents from an
  equality filter when the field is missing entirely, so every
  notification created here was invisible in the bell dropdown
  and the notifications page, even though the Firestore doc was
  created successfully.

  To fix this without having to touch every call site in
  orderService.js, this file now simply forwards to the same
  notification pipeline used everywhere else in the app
  (notificationService.js), keeping the same function
  names/signatures for backwards compatibility.
*/

// =================================
// Admin Notification
// =================================

export const createAdminNotification = async ({
  title,
  message,
  type = "system",
  actionUrl = "",
  priority = "low",
}) => {
  await notifyAdmin({
    title,
    message,
    type,
    actionUrl,
    priority,
  });
};

// =================================
// User Notification
// =================================

export const createUserNotification = async ({
  userId,
  title,
  message,
  type = "system",
  actionUrl = "",
  priority = "low",
}) => {
  await notifyUser(userId, {
    title,
    message,
    type,
    actionUrl,
    priority,
  });
};

// =================================
// Generic Notification (compatibility)
// =================================

export const createNotification = async ({
  receiverId,
  title,
  message,
  type = "system",
  actionUrl = "",
  priority = "low",
}) => {
  if (receiverId === "ADMIN") {
    return createAdminNotification({ title, message, type, actionUrl, priority });
  }
  return createUserNotification({ userId: receiverId, title, message, type, actionUrl, priority });
};
