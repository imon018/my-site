import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

export async function getUsers() {
  const snap = await getDocs(collection(db, "users"));

  return snap.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function changeRole(id, role) {
  await updateDoc(doc(db, "users", id), {
    role,
  });
}

export async function deleteUser(id) {
  await deleteDoc(doc(db, "users", id));
}
