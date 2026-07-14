import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";


import {
  db
} from "../firebase/firestore";


import {
  sendNotification,
} from "./notificationService";



const orderRef =
collection(
  db,
  "orders"
);









// =========================
// Create Order (Customer)
// =========================

export const createOrder =
async(order)=>{


  const docRef =

  await addDoc(

    orderRef,

    order

  );





  // =========================
  // ADMIN NOTIFICATION
  // =========================


  await sendNotification({

    title:
      "New Order Received",


    message:
      `New order received from ${order.email || "customer"}.`,


    userId:
      "admin",


    type:
      "new_order",

  });






  return docRef.id;


};









// =========================
// Get User Orders
// =========================

export const getUserOrders =
async(email)=>{


  const q =

  query(

    orderRef,


    where(

      "email",

      "==",

      email

    )

  );






  const snapshot =

  await getDocs(q);






  return snapshot.docs.map(

    (doc)=>({

      id:doc.id,

      ...doc.data(),

    })

  );


};









// =========================
// Get All Orders
// =========================

export const getAllOrders =
async()=>{


  const snapshot =

  await getDocs(
    orderRef
  );





  return snapshot.docs.map(

    (doc)=>(

      {

        id:doc.id,

        ...doc.data(),

      }

    )

  );


};









// =========================
// Update Order Status
// =========================

export const updateOrderStatus =
async(
  id,
  status
)=>{


  const orderDoc =

  doc(

    db,

    "orders",

    id

  );






  // get old order info

  const orderSnap =

  await getDoc(
    orderDoc
  );





  const order =

  orderSnap.exists()

  ?

  orderSnap.data()

  :

  null;









  await updateDoc(

    orderDoc,

    {

      status,

    }

  );









  // =========================
  // USER NOTIFICATION
  // =========================


  if(order?.userId){



    await sendNotification({

      title:
        "Order Status Updated",


      message:
        `Your order status changed to ${status}.`,


      userId:
        order.userId,


      type:
        "order_status",


    });


  }





};









// =========================
// Admin Add Order
// =========================

export const addOrderByAdmin =
async(order)=>{


  const docRef =

  await addDoc(

    orderRef,

    order

  );





  await sendNotification({

    title:
      "New Order Added",


    message:
      "Admin created a new order.",


    userId:
      "admin",


    type:
      "admin_order",


  });






  return docRef.id;


};









// =========================
// Delete Order
// =========================

export const deleteOrder =
async(id)=>{


  await deleteDoc(

    doc(

      db,

      "orders",

      id

    )

  );


};









// =========================
// Cancel Request
// =========================

export const requestCancelOrder =
async(id)=>{


  const orderDoc =

  doc(

    db,

    "orders",

    id

  );





  await updateDoc(

    orderDoc,

    {

      cancelRequested:true,

    }

  );





  await sendNotification({

    title:
      "Cancel Request",


    message:
      "Customer requested order cancellation.",


    userId:
      "admin",


    type:
      "cancel_request",


  });



};









// =========================
// Return Request
// =========================

export const requestReturnOrder =
async(id)=>{


  const orderDoc =

  doc(

    db,

    "orders",

    id

  );





  await updateDoc(

    orderDoc,

    {

      returnRequested:true,

    }

  );





  await sendNotification({

    title:
      "Return Request",


    message:
      "Customer requested order return.",


    userId:
      "admin",


    type:
      "return_request",


  });



};
