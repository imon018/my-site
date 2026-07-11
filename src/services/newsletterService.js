import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";


import {
  db
} from "../firebase/firebaseConfig";



const subscribersCollection =
collection(
  db,
  "subscribers"
);




// ADD SUBSCRIBER

export async function addSubscriber(email){


  await addDoc(

    subscribersCollection,

    {

      email,

      createdAt:
        serverTimestamp(),

    }

  );

}




// GET ALL SUBSCRIBERS

export async function getSubscribers(){


  const q =
  query(

    subscribersCollection,

    orderBy(
      "createdAt",
      "desc"
    )

  );



  const snapshot =
  await getDocs(q);



  return snapshot.docs.map(
    doc => ({

      id:doc.id,

      ...doc.data()

    })
  );


}






// DELETE SUBSCRIBER

export async function deleteSubscriber(id){


  await deleteDoc(

    doc(
      db,
      "subscribers",
      id
    )

  );


}
