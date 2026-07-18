import {
  useState,
} from "react";


import useAuth from "../../hooks/useAuth";


import {
  createDeleteAccountRequest,
} from "../../services/deleteAccountService";


import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";


import Button from "../../components/ui/Button";








export default function DeleteAccount(){



const {
  user
} = useAuth();





const [
password,
setPassword
]=useState("");





const [
loading,
setLoading
]=useState(false);









const handleDeleteRequest =
async()=>{



if(!password){


errorToast(
"Enter your password."
);


return;


}







const confirm =
window.confirm(

"Are you sure? Your account will be permanently deleted after email verification."

);






if(!confirm){


return;


}








try{


setLoading(true);







await createDeleteAccountRequest(

user,

password

);







successToast(

"Verification email sent. Please check your inbox."

);







setPassword("");





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

<div>


<h1 className="
text-3xl
font-bold
mb-8
text-red-600
">

Delete Account

</h1>








<div className="
bg-white
rounded-3xl
shadow
p-8
">






<p className="
text-gray-600
mb-5
">

Enter your password. We will send a verification email before deleting your account.

</p>








<input


type="password"


placeholder="Enter your password"


value={password}


onChange={(e)=>

setPassword(
e.target.value
)

}


className="
w-full
border
rounded-xl
p-3
outline-none
focus:border-red-500
"




/>









<Button


onClick={handleDeleteRequest}


disabled={loading}


className="
w-full
mt-6
bg-red-600
"


>


{

loading

?

"Sending Email..."

:

"Delete Account"

}



</Button>








</div>





</div>

);


}
