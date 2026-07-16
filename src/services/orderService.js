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
  createAdminNotification,
  createUserNotification,
} from "../utils/notificationHelper";



const orderRef =
collection(
  db,
  "orders"
);




// =================================
// CREATE ORDER
// =================================

export const createOrder =
async(order)=>{


  const docRef =
  await addDoc(
    orderRef,
    order
  );


  if(order.userId){

    await createUserNotification({

      userId: order.userId,

      title:
      "🛒 Order Placed",

      message:
      "Your order has been placed successfully.",

      type:
      "order",

    });

  }



  await createAdminNotification({

    title:
    "📦 New Order Received",

    message:
    `${order.customerName || "Customer"} placed a new order.`,

    type:
    "order",

  });



  return docRef.id;


};





// =================================
// GET USER ORDERS
// =================================

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

item=>({

id:item.id,

...item.data(),

})

);


};





// =================================
// GET ALL ORDERS ADMIN
// =================================

export const getAllOrders =
async()=>{


const snapshot =
await getDocs(orderRef);



return snapshot.docs.map(

item=>({

id:item.id,

...item.data(),

})

);


};





// =================================
// UPDATE ORDER STATUS ADMIN
// =================================

export const updateOrderStatus =
async(id,status)=>{


const orderDoc =
doc(
db,
"orders",
id
);



const snapshot =
await getDoc(orderDoc);



if(!snapshot.exists()){

throw new Error(
"Order not found"
);

}



const order =
snapshot.data();



await updateDoc(

orderDoc,

{

status,

}

);




let title =
"📦 Order Updated";


let message =
`Your order status changed to ${status}.`;



if(status==="Confirmed"){

title =
"✅ Order Confirmed";

message =
"Your order has been confirmed.";

}



if(status==="Shipped"){

title =
"🚚 Order Shipped";

message =
"Your order is on the way.";

}



if(status==="Delivered"){

title =
"🎉 Order Delivered";

message =
"Your order has been delivered.";

}



if(status==="Cancelled"){

title =
"❌ Order Cancelled";

message =
"Your order has been cancelled.";

}




if(order.userId){

await createUserNotification({

userId:
order.userId,

title,

message,

type:
"order",

});


}



};





// =================================
// DELETE ORDER
// =================================

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





// =================================
// USER DIRECT CANCEL ORDER
// =================================

export const requestCancelOrder =
async(id)=>{


const orderDoc =
doc(
db,
"orders",
id
);



const snapshot =
await getDoc(orderDoc);



if(!snapshot.exists()){

throw new Error(
"Order not found"
);

}



const order =
snapshot.data();




await updateDoc(

orderDoc,

{

status:
"Cancelled",

cancelledBy:
"user",

cancelledAt:
new Date(),

}

);





if(order.userId){

await createUserNotification({

userId:
order.userId,


title:
"❌ Order Cancelled",


message:
"Your order has been cancelled successfully.",


type:
"order",

});


}





await createAdminNotification({

title:
"❌ Order Cancelled By Customer",


message:
`${order.customerName || "Customer"} cancelled order #${id.slice(0,8)}.`,


type:
"order",

});



};





// =================================
// RETURN REQUEST
// =================================

export const requestReturnOrder =
async(id)=>{


const orderDoc =
doc(
db,
"orders",
id
);



const snapshot =
await getDoc(orderDoc);



if(!snapshot.exists()){

throw new Error(
"Order not found"
);

}



const order =
snapshot.data();



await updateDoc(

orderDoc,

{

returnRequested:true,

}

);




await createAdminNotification({

title:
"🔄 Return Request",


message:
`${order.customerName || "Customer"} requested return for order #${id.slice(0,8)}.`,


type:
"order",

});


};
