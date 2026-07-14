import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";


import {
  db,
} from "../firebase/firestore";




// ==============================
// CREATE NOTIFICATION
// ==============================

export async function createNotification(data){

  try{


    await addDoc(

      collection(
        db,
        "notifications"
      ),

      {

        userId:
          data.userId || null,


        role:
          data.role || "user",


        title:
          data.title,


        message:
          data.message,


        type:
          data.type || "system",


        action:
          data.action || null,


        relatedId:
          data.relatedId || null,


        isRead:false,


        createdAt:
          serverTimestamp(),

      }

    );


  }
  catch(error){

    console.log(
      "Notification create error:",
      error
    );

  }

}









// ==============================
// USER NOTIFICATION
// ==============================

export async function createUserNotification({

  userId,

  title,

  message,

  type,

  action,

  relatedId,

}){


  return createNotification({

    userId,

    role:"user",

    title,

    message,

    type,

    action,

    relatedId,

  });


}









// ==============================
// ADMIN NOTIFICATION
// ==============================

export async function createAdminNotification({

  title,

  message,

  type,

  action,

  relatedId,

}){


  return createNotification({

    userId:null,

    role:"admin",

    title,

    message,

    type,

    action,

    relatedId,

  });


}









// ==============================
// SEND TO MULTIPLE USERS
// ==============================

export async function sendNotificationToUsers(
  users,
  data
){


  const batch =
    writeBatch(db);



  users.forEach((user)=>{


    const ref =
      doc(
        collection(
          db,
          "notifications"
        )
      );



    batch.set(

      ref,

      {

        userId:user.uid,


        role:"user",


        title:data.title,


        message:data.message,


        type:data.type || "system",


        action:data.action || null,


        relatedId:data.relatedId || null,


        isRead:false,


        createdAt:
          serverTimestamp(),

      }

    );


  });



  await batch.commit();


}









// ==============================
// GET USER NOTIFICATIONS
// ==============================

export function getUserNotifications(userId){


  return query(

    collection(
      db,
      "notifications"
    ),


    where(
      "userId",
      "==",
      userId
    ),


    orderBy(
      "createdAt",
      "desc"
    )


  );


}









// ==============================
// MARK AS READ
// ==============================

export async function markNotificationAsRead(id){


  const ref =
    doc(
      db,
      "notifications",
      id
    );


  await updateDoc(

    ref,

    {

      isRead:true

    }

  );


}









// ==============================
// MARK ALL READ
// ==============================

export async function markAllNotificationsAsRead(
  userId
){


  const q =
    query(

      collection(
        db,
        "notifications"
      ),


      where(
        "userId",
        "==",
        userId
      )

    );



  const snapshot =
    await getDocs(q);



  const batch =
    writeBatch(db);



  snapshot.forEach((item)=>{


    batch.update(

      item.ref,

      {

        isRead:true

      }

    );


  });



  await batch.commit();


}









// ==============================
// DELETE SINGLE
// ==============================

export async function deleteNotification(id){


  await deleteDoc(

    doc(
      db,
      "notifications",
      id
    )

  );


}









// ==============================
// DELETE ALL
// ==============================

export async function deleteAllNotifications(
  userId
){


  const q =
    query(

      collection(
        db,
        "notifications"
      ),


      where(
        "userId",
        "==",
        userId
      )

    );



  const snapshot =
    await getDocs(q);



  const batch =
    writeBatch(db);



  snapshot.forEach((item)=>{


    batch.delete(
      item.ref
    );


  });



  await batch.commit();


}
