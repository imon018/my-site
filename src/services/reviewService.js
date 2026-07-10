import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";



const reviewsCollection =
  collection(
    db,
    "reviews"
  );



export async function addReview(reviewData){

  await addDoc(
    reviewsCollection,
    {

      ...reviewData,

      createdAt:
        serverTimestamp(),

    }
  );

}




export async function getProductReviews(
  productId
){

  const q =
    query(

      reviewsCollection,

      where(
        "productId",
        "==",
        productId
      ),

      orderBy(
        "createdAt",
        "desc"
      )

    );



  const snapshot =
    await getDocs(q);



  return snapshot.docs.map(
    (doc)=>({

      id:doc.id,

      ...doc.data()

    })
  );

}
