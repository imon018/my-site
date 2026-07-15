import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";



import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";



import {
  auth
} from "../firebase/auth";


import {
  db
} from "../firebase/firestore";





// =========================
// LOGIN
// =========================

export async function login(
  email,
  password
){


const result =
await signInWithEmailAndPassword(
  auth,
  email,
  password
);



await updateDoc(

doc(
db,
"users",
result.user.uid
),

{

lastLogin:
serverTimestamp()

}

);



return result.user;


}









// =========================
// REGISTER
// =========================

export async function register(
  email,
  password,
  name
){


const result =
await createUserWithEmailAndPassword(
auth,
email,
password
);




await setDoc(

doc(
db,
"users",
result.user.uid
),

{

name,

email,

phone:"",

address:"",

photoURL:"",

role:"user",

createdAt:
serverTimestamp(),

}

);





await sendEmailVerification(
result.user
);



return result.user;


}









// =========================
// SEND VERIFICATION EMAIL
// =========================

export async function sendVerificationEmail(
user
){


if(!user){

throw new Error(
"User not found"
);

}



await sendEmailVerification(
user
);


}









// =========================
// RESEND VERIFICATION EMAIL
// =========================

export async function resendVerificationEmail(
user
){


if(!user){

throw new Error(
"User not found"
);

}



await sendEmailVerification(
user
);


}









// =========================
// REQUEST PASSWORD CHANGE
// =========================

export async function requestPasswordChange(

user,

currentPassword,

newPassword

){



if(!user){

throw new Error(
"User not found"
);

}





// Verify current password


const credential =

EmailAuthProvider.credential(

user.email,

currentPassword

);





await reauthenticateWithCredential(

user,

credential

);







// Save password change request


await setDoc(

doc(

db,

"passwordChangeRequests",

user.uid

),

{


uid:user.uid,


email:user.email,


newPassword,


verified:false,


createdAt:
serverTimestamp()


}

);







// Send verification email


await sendEmailVerification(

user

);





return true;


}









// =========================
// APPLY PASSWORD CHANGE
// =========================

export async function applyPasswordChange(

user

){



if(!user){

throw new Error(
"User not found"
);

}






const requestRef =

doc(

db,

"passwordChangeRequests",

user.uid

);






const requestSnap =

await getDoc(

requestRef

);







if(!requestSnap.exists()){


throw new Error(

"No password change request found."

);


}






const data =

requestSnap.data();








await updatePassword(

user,

data.newPassword

);








await deleteDoc(

requestRef

);






return true;


}









// =========================
// FORGOT PASSWORD
// =========================

export async function forgotPassword(

email

){


await sendPasswordResetEmail(

auth,

email

);


}









// =========================
// DELETE ACCOUNT
// =========================

export async function deleteUserAccount(

user

){


if(!user){

throw new Error(
"User not found"
);

}



await deleteUser(

user

);


}









// =========================
// LOGOUT
// =========================

export async function logout(){


await signOut(

auth

);


}
