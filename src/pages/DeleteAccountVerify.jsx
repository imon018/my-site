import {
  useEffect,
  useState,
} from "react";


import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";


import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";


import {
  deleteUser,
} from "firebase/auth";


import {
  db,
} from "../firebase/firestore";


import {
  auth,
} from "../firebase/auth";


import {
  successToast,
  errorToast,
} from "../components/ui/Toast";







export default function DeleteAccountVerify(){



const navigate =
useNavigate();



const [
searchParams
]=useSearchParams();



const token =
searchParams.get(
"token"
);





const [
message,
setMessage
]=useState(

"Verifying delete request..."

);





const [
loading,
setLoading
]=useState(false);





const [
requestData,
setRequestData
]=useState(null);





const [
requestId,
setRequestId
]=useState(null);









useEffect(()=>{


findRequest();


},[]);









// =========================
// FIND DELETE REQUEST
// =========================

const findRequest =
async()=>{


try{


if(!token){


throw new Error(
"Invalid delete account link."
);


}







const q =

query(

collection(
db,
"deleteAccountRequests"
),

where(
"token",
"==",
token
)

);







const snapshot =
await getDocs(q);






if(snapshot.empty){


throw new Error(
"Invalid or expired delete link."
);


}








const requestDoc =
snapshot.docs[0];





setRequestId(
requestDoc.id
);



const data =
requestDoc.data();





setRequestData(
data
);





setMessage(

"Are you sure you want to permanently delete your account?"

);



}
catch(error){


console.log(error);



errorToast(
error.message
);



setMessage(
error.message
);


}



};












// =========================
// DELETE ACCOUNT
// =========================

const handleDelete =
async()=>{


try{


setLoading(true);





if(!requestData){


throw new Error(
"Invalid delete request."
);


}







const user =
auth.currentUser;





if(!user){


throw new Error(
"Please login again."
);


}








// Delete Firestore User Data

await deleteDoc(

doc(

db,

"users",

requestData.uid

)

);







// Delete Firebase Auth Account

await deleteUser(
user
);







// Remove request

await deleteDoc(

doc(

db,

"deleteAccountRequests",

requestId

)

);







successToast(

"Account deleted successfully."

);







setMessage(

"Account deleted successfully. Redirecting..."

);








setTimeout(()=>{


navigate("/");


},2000);






}
catch(error){


console.log(error);



errorToast(
error.message
);



setMessage(
error.message
);


}
finally{


setLoading(false);


}



};












// =========================
// CANCEL
// =========================

const handleCancel =()=>{


navigate("/profile/security/delete");


};










return (

<div className="
min-h-screen
bg-[#FAF7F2]
p-4
flex
items-center
justify-center
">





<div className="
bg-white
rounded-2xl
shadow-lg
border
border-gray-100
p-8
max-w-md
w-full
text-center
">






<div className="
text-5xl
mb-5
">

⚠️

</div>






<h1 className="
text-2xl
font-bold
mb-4
">

Delete Account

</h1>






<p className="
text-gray-600
mb-8
">

{message}

</p>








{

requestData &&

<div className="
space-y-3
">





<button

onClick={handleDelete}

disabled={loading}

className="
w-full
h-12
bg-red-600
text-white
rounded-xl
font-semibold
disabled:opacity-50
"

>

{

loading

?

"Deleting..."

:

"Yes, Delete My Account"

}

</button>







<button

onClick={handleCancel}

disabled={loading}

className="
w-full
h-12
bg-gray-100
text-gray-700
rounded-xl
font-semibold
"

>

No, Keep My Account

</button>






</div>

}








</div>



</div>

);


}
