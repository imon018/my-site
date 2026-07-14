import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

// Collection Reference
const notificationsRef = collection(db, "notifications");

// ===============================
// Send Notification (Single User)
// ===============================
export const sendNotification = async ({
  receiverId,
  title,
  message,
  type = "system",
  senderId = "admin",
  senderName = "Dream Mode",
  link = "",
}) => {
  try {
    await addDoc(notificationsRef, {
      receiverId,
      title,
      message,
      type,
      senderId,
      senderName,
      link,
      isRead: false,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Notification sent successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
};

// ===============================
// Get User Notifications
// ===============================
export const getUserNotifications = (userId) => {
  return query(
    notificationsRef,
    where("receiverId", "==", userId),
    orderBy("createdAt", "desc")
  );
};

// ===============================
// Mark As Read
// ===============================
export const markNotificationAsRead = async (id) => {
  try {
    await updateDoc(doc(db, "notifications", id), {
      isRead: true,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// ===============================
// Mark All As Read
// ===============================
export const markAllNotificationsAsRead = async (userId) => {
  const q = query(
    notificationsRef,
    where("receiverId", "==", userId)
  );

  const snapshot = await getDocs(q);

  const batch = writeBatch(db);

  snapshot.forEach((item) => {
    batch.update(item.ref, {
      isRead: true,
    });
  });

  await batch.commit();
};

// ===============================
// Delete Notification
// ===============================
export const deleteNotification = async (id) => {
  await deleteDoc(doc(db, "notifications", id));
};

// ===============================
// Delete All Notifications
// ===============================
export const deleteAllNotifications = async (userId) => {
  const q = query(
    notificationsRef,
    where("receiverId", "==", userId)
  );

  const snapshot = await getDocs(q);

  const batch = writeBatch(db);

  snapshot.forEach((item) => {
    batch.delete(item.ref);
  });

  await batch.commit();
};
