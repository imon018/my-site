import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firestore";


const heroRef = doc(
  db,
  "settings",
  "shopHero"
);


export const saveHeroBanner = async (
  data
) => {
  await setDoc(
    heroRef,
    data
  );
};


export const getHeroBanner =
async () => {

  const snapshot =
    await getDoc(heroRef);


  if (!snapshot.exists()) {
    return null;
  }


  return {
    id: snapshot.id,
    ...snapshot.data(),
  };

};
