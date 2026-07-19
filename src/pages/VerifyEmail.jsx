import {
  useState,
  useEffect
} from "react";


import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";


import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";


import {
  db
} from "../firebase/firestore";


import {
  successToast,
  errorToast,
} from "../components/ui/Toast";


import ResendVerificationButton from "../components/auth/ResendVerificationButton";




export default function VerifyEmail(){



const location =
useLocation();



const navigate =
useNavigate();




const [
loading,
setLoading
]=useState(false);





const [
message,
setMessage
]=useState(
"Please verify your email address."
);





const [
verified,
setVerified
]=useState(false);






const email =
location.state?.email || "";






const params =
new URLSearchParams(
location.search
);



const token =
params.get("token");






useEffect(()=>{


if(token){

verifyEmail();

}


},[]);







const verifyEmail =
async()=>{


try{


if(!token){


throw new Error(
"Invalid verification link."
);


}





setLoading(true);





const verificationQuery =

query(

collection(
db,
"emailVerificationRequests"
),

where(
"token",
"==",
token
)

);







const snap =
await getDocs(
verificationQuery
);







if(
snap.empty
){


throw new Error(
"Verification link expired or invalid."
);


}







const requestDoc =
snap.docs[0];





const data =
requestDoc.data();







const userRef =
doc(

db,

"users",

data.uid

);






await updateDoc(

userRef,

{

emailVerified:true

}

);








await deleteDoc(

requestDoc.ref

);







setVerified(true);







successToast(

"Email verified successfully."

);






setMessage(

"Your email has been verified successfully. Redirecting..."

);







setTimeout(()=>{


navigate(
"/login"
);


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









return (

<div
className="
min-h-screen
bg-[#faf9f6]
flex
items-center
justify-center
px-4
py-12
"
>



<div

className="
w-full
max-w-md
bg-white
border
border-gray-100
rounded-2xl
shadow-sm
p-6
text-center
"

>





<div

className="
w-20
h-20
mx-auto
rounded-full
bg-amber-50
flex
items-center
justify-center
text-5xl
mb-6
"

>

{
verified
?
"✅"
:
"📧"
}

</div>







<h1

className="
text-2xl
font-bold
text-gray-800
mb-3
"

>

{
verified
?
"Email Verified"
:
"Verify Your Email"
}

</h1>








<p

className="
text-gray-500
text-sm
mb-5
"

>

{
verified
?

"Your account email verification is complete."

:

"We have sent a verification link to your email address."

}

</p>







{
email && (

<div

className="
bg-gray-50
border
border-gray-100
rounded-xl
p-3
mb-5
"

>

<p

className="
text-xs
text-gray-400
mb-1
"

>

Email

</p>



<p

className="
font-semibold
text-gray-700
break-all
"

>

{email}

</p>


</div>

)

}








<p

className="
text-sm
text-gray-500
mb-6
"

>

{message}

</p>







{
!verified && (

<button

onClick={verifyEmail}

disabled={loading}


className="
w-full
bg-[#F59E0B]
text-white
py-3
rounded-xl
font-semibold
transition
hover:bg-amber-600
disabled:opacity-50
"

>


{

loading

?

"Verifying..."

:

"I Have Verified My Email"

}


</button>

)

}


{
!verified && (

<div

className="
mt-4
flex
justify-center
"

>

<ResendVerificationButton />

</div>

)

}








<div

className="
mt-6
"

>

<Link

to="/login"

className="
text-sm
text-amber-600
font-semibold
hover:underline
"

>

Go To Login

</Link>


</div>







</div>


</div>

);


}
