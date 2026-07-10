import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const bannerRef = collection(
  db,
  "heroBanners"
);

/* =========================
   ADD BANNER
========================= */

export const addBanner = async (
  bannerData
) => {
  return await addDoc(
    bannerRef,
    {
      ...bannerData,
      createdAt: Date.now(),
    }
  );
};

/* =========================
   GET ALL BANNERS
========================= */

export const getAllBanners =
  async () => {
    const q = query(
      bannerRef,
      orderBy(
        "createdAt",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  };

/* =========================
   GET SINGLE BANNER
========================= */

export const getBannerById =
  async (id) => {
    const bannerDoc = doc(
      db,
      "heroBanners",
      id
    );

    const snapshot =
      await getDoc(
        bannerDoc
      );

    if (
      !snapshot.exists()
    ) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  };

/* =========================
   UPDATE BANNER
========================= */

export const updateBanner =
  async (
    id,
    updatedData
  ) => {
    const bannerDoc = doc(
      db,
      "heroBanners",
      id
    );

    await updateDoc(
      bannerDoc,
      updatedData
    );
  };

/* =========================
   DELETE BANNER
========================= */

export const deleteBanner =
  async (id) => {
    await deleteDoc(
      doc(
        db,
        "heroBanners",
        id
      )
    );
  };

/* =========================
   TOTAL BANNER COUNT
========================= */

export const getBannerCount =
  async () => {
    const snapshot =
      await getDocs(
        bannerRef
      );

    return snapshot.size;
  };

/* =========================
   MAX 5 BANNERS CHECK
========================= */

export const canAddBanner =
  async () => {
    const count =
      await getBannerCount();

    return count < 5;
  };

/* =========================
   GET LATEST BANNER
========================= */

export const getLatestBanner =
  async () => {
    const q = query(
      bannerRef,
      orderBy(
        "createdAt",
        "desc"
      ),
      limit(1)
    );

    const snapshot =
      await getDocs(q);

    if (
      snapshot.empty
    ) {
      return null;
    }

    const banner =
      snapshot.docs[0];

    return {
      id: banner.id,
      ...banner.data(),
    };
  };
