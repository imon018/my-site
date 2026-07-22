import { db } from "../firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

const landingCollection = collection(db, "landingPages");

// Create Landing Page
export const createLandingPage = async (data) => {
  const slug = data.slug.toLowerCase().trim();

  const q = query(landingCollection, where("slug", "==", slug));
  const exists = await getDocs(q);

  if (!exists.empty) {
    throw new Error("Landing page slug already exists.");
  }

  const docRef = await addDoc(landingCollection, {
    ...data,
    slug,
    status: "draft",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

// Get All Landing Pages
export const getLandingPages = async () => {
  const snapshot = await getDocs(landingCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get By ID
export const getLandingPageById = async (id) => {
  const ref = doc(db, "landingPages", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data(),
  };
};

// Get By Slug
export const getLandingPageBySlug = async (slug) => {
  const q = query(
    landingCollection,
    where("slug", "==", slug),
    where("status", "==", "published")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
};

// Update Landing Page
export const updateLandingPage = async (id, data) => {
  const ref = doc(db, "landingPages", id);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Delete Landing Page
export const deleteLandingPage = async (id) => {
  const ref = doc(db, "landingPages", id);

  await deleteDoc(ref);
};

// Publish / Draft
export const toggleLandingPageStatus = async (id, status) => {
  const ref = doc(db, "landingPages", id);

  await updateDoc(ref, {
    status,
    updatedAt: serverTimestamp(),
  });
};
