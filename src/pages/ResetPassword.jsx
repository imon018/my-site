import {
  useState
} from "react";


import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";


import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";


import {
  auth
} from "../firebase/auth";


import Button from "../components/ui/Button";


import {
  successToast,
  errorToast
} from "../components/ui/Toast";





export default function ResetPassword(){



const [
params
]=useSearchParams();



const navigate =
useNavigate();




const code =
params.get(
"oobCode"
);





const [
password,
setPassword
]=useState("");



const [
confirm,
setConfirm
]=useState("");





const [
loading,
setLoading
]=useState(false);







const handleReset =
async()=>{


if(!password || !confirm){


errorToast(
"Please fill all fields."
);


return;


}





if(password.length < 6){


errorToast(
"Password must be at least 6 characters."
);


return;


}





if(password !== confirm){


errorToast(
"Passwords do not match."
);


return;


}




try{


setLoading(true);





await verifyPasswordResetCode(

auth,

code

);







await confirmPasswordReset(

auth,

code,

password

);






localStorage.setItem(

"passwordResetDone",

"true"

);







successToast(

"Password updated successfully."

);






setTimeout(()=>{


navigate(
"/login"
);


},1500);





}
catch(error){


console.log(error);



errorToast(
error.message
);


}
finally{


setLoading(false);


}



};










return (

<div className="
max-w-md
mx-auto
py-20
px-6
">


<h1 className="
text-3xl
font-bold
mb-6
">

Reset Password

</h1>






<input

type="password"

className="
w-full
border
p-3
rounded-xl
mb-4
"

placeholder="New Password"

value={password}

onChange={(e)=>
setPassword(
e.target.value
)
}

/>







<input

type="password"

className="
w-full
border
p-3
rounded-xl
mb-4
"

placeholder="Confirm Password"

value={confirm}

onChange={(e)=>
setConfirm(
e.target.value
)
}

/>







<Button

onClick={handleReset}

disabled={loading}

className="
w-full
"

>

{

loading

?

"Saving..."

:

"Save Password"

}


</Button>





</div>

);


}
