import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";


import {
  db,
} from "../firebase/firestore";





const notificationRef =
collection(
  db,
  "notifications"
);







// =================================
// Create Notification Helper
// =================================


export const createNotification = async({

  receiverId,

  title,

  message,

  type = "system",

})=>{


  try{


    await addDoc(

      notificationRef,

      {

        receiverId,


        title,


        message,


        type,


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


};






// =================================
// Admin Notification
// =================================


export const createAdminNotification = async({

  title,

  message,

  type="system",

})=>{


  await createNotification({

    receiverId:"ADMIN",

    title,

    message,

    type,

  });


};






// =================================
// User Notification
// =================================


export const createUserNotification = async({

  userId,

  title,

  message,

  type="system",

})=>{


  await createNotification({

    receiverId:userId,

    title,

    message,

    type,

  });


};
