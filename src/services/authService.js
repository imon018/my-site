import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { auth } from "../firebase/auth";
import { db } from "../firebase/firestore";

const ensureAuth = () => {
  if (!auth) throw new Error("Authentication is not configured.");
};

const ensureDB = () => {
  if (!db) throw new Error("Database is not configured.");
};

export const login = (email, password) => {
  ensureAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email, password) => {
  ensureAuth();

  const result = await createUserWithEmailAndPassword(auth, email, password);

  // try to write the user profile to Firestore; if DB isn't configured
  // or the write fails we log the error but still return the auth result
  // so the user creation is not silently swallowed.
  try {
    ensureDB();
    const userRef = doc(db, "users", result.user.uid);

    await setDoc(userRef, {
      email: result.user.email,
      role: "user",
      createdAt: serverTimestamp()
    });
  } catch (err) {
    // don't block registration on Firestore write errors; log for debugging
    console.error("Failed to write user to Firestore:", err);
  }

  return result;
};

export const logout = () => {
  ensureAuth();
  return signOut(auth);
};
