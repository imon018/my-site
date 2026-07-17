import {
db
} from "../firebase/firestore";


import {
collection,
addDoc,
serverTimestamp
} from "firebase/firestore";



export async function createPasswordRequest(user){


const token =
crypto.randomUUID();



await addDoc(

collection(
db,
"passwordChangeRequests"
),

{

uid:user.uid,

email:user.email,

token,

createdAt:
serverTimestamp(),

verified:false

}

);


return token;


}
