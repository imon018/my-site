import {
  db
} from "../firebase/firestore";


import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";




// =========================
// CREATE DELETE ACCOUNT REQUEST
// =========================

export async function createDeleteAccountRequest(
  user
){


if(!user){

throw new Error(
"User not found."
);

}




const token =
crypto.randomUUID();


const expiresAt =
Date.now() + 15 * 60 * 1000;


await setDoc(

doc(

db,

"deleteAccountRequests",

user.uid

),

{

uid:user.uid,

email:user.email,

token,

verified:false,

expiresAt,

createdAt:
serverTimestamp()

}

);





return token;


}
