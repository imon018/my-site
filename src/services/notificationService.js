import {
  db
} from "../firebase/firestore";


import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";




// =========================
// CREATE NOTIFICATION
// =========================

export async function createNotification(data){

  try{

    await addDoc(

      collection(
        db,
        "notifications"
      ),

      {

        ...data,

        read:false,

        createdAt:
        serverTimestamp()

      }

    );


  }

  catch(error){

    console.log(
      "Notification Error:",
      error
    );

    throw error;

  }

}






// =========================
// REALTIME USER LISTENER
// USER + ALL USERS
// =========================


export function listenUserNotifications(
  userId,
  callback
){


const q = query(

  collection(
    db,
    "notifications"
  ),


  where(
    "receiverId",
    "in",
    [
      userId,
      "ALL_USERS"
    ]
  ),


  orderBy(
    "createdAt",
    "desc"
  )

);



return onSnapshot(

  q,

  (snapshot)=>{


    const data =
    snapshot.docs.map(

      doc=>({

        id:doc.id,

        ...doc.data()

      })

    );


    callback(data);


  }


);


}








// =========================
// REALTIME ADMIN LISTENER
// =========================


export function listenAdminNotifications(
callback
){


const q=query(

  collection(
    db,
    "notifications"
  ),


  where(
    "receiverId",
    "==",
    "ADMIN"
  ),


  orderBy(
    "createdAt",
    "desc"
  )

);



return onSnapshot(

q,

(snapshot)=>{


const data =
snapshot.docs.map(

doc=>({

id:doc.id,

...doc.data()

})

);



callback(data);


}


);


}









// =========================
// GET USER NOTIFICATIONS
// =========================


export async function getUserNotifications(
userId
){


return [];

}









// =========================
// GET ADMIN NOTIFICATIONS
// =========================


export async function getAdminNotifications(){


return [];

}









// =========================
// MARK AS READ
// =========================


export async function markNotificationRead(
id
){


await updateDoc(

doc(
db,
"notifications",
id
),

{

read:true

}

);


}









// =========================
// MARK ALL READ
// =========================


export async function markAllNotificationsRead(
notifications
){


const updates =

notifications.map(

(item)=>

updateDoc(

doc(
db,
"notifications",
item.id
),

{

read:true

}

)

);



await Promise.all(
updates
);


}









// =========================
// DELETE NOTIFICATION
// =========================


export async function deleteNotification(
id
){


await deleteDoc(

doc(
db,
"notifications",
id
)

);


}









// =========================
// DELETE ALL
// =========================


export async function deleteAllNotifications(
notifications
){


const deletes =

notifications.map(

(item)=>

deleteDoc(

doc(
db,
"notifications",
item.id

)

)

);



await Promise.all(
deletes
);


}









// =========================
// SEND ADMIN NOTIFICATION
// =========================


export async function sendAdminNotification(
data
){


await addDoc(

collection(
db,
"notifications"
),


{

...data,

receiverId:"ADMIN",

read:false,

createdAt:
serverTimestamp()

}


);


}









// =========================
// SEND TO ALL USERS
// =========================


export async function sendNotificationToAllUsers(
data
){


await addDoc(

collection(
db,
"notifications"
),


{

...data,

receiverId:"ALL_USERS",

read:false,

createdAt:
serverTimestamp()

}


);


}









// =========================
// SEND SINGLE
// =========================


export async function sendNotification(
data
){

return createNotification(data);

}
