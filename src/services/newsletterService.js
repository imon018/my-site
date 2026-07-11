import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit,
  serverTimestamp,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const subscribersRef = collection(db, "subscribers");



// Subscribe

export async function subscribeEmail(email) {

  email = email.trim().toLowerCase();

  const q = query(
    subscribersRef,
    where("email", "==", email),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("Email already subscribed.");
  }

  await addDoc(subscribersRef, {
    email,
    active: true,
    createdAt: serverTimestamp(),
  });

}


// GET ONLY ACTIVE SUBSCRIBER EMAILS

export async function getSubscriberEmails() {

  const subscribers = await getSubscribers();

  return subscribers
    .filter(item => item.active)
    .map(item => item.email);

}



// Admin List

export async function getSubscribers() {

  const q = query(
    subscribersRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

}

// DELETE SUBSCRIBER

export async function deleteSubscriber(id) {

  await deleteDoc(
    doc(db, "subscribers", id)
  );

}
