import {
  useState
} from "react";


import useAuth from "../../hooks/useAuth";


import {
  changePassword
} from "../../services/authService";


import Button from "../../components/ui/Button";


import {
  successToast,
  errorToast
} from "../../components/ui/Toast";




export default function ChangePassword(){


const {user}=useAuth();



const [
currentPassword,
setCurrentPassword
]=useState("");



const [
newPassword,
setNewPassword
]=useState("");



const [
loading,
setLoading
]=useState(false);





const handleChangePassword =
async()=>{


if(
!currentPassword ||
!newPassword
){

errorToast(
"Fill all password fields."
);

return;

}




if(newPassword.length < 6){

errorToast(
"Password must be at least 6 characters."
);

return;

}



try{


setLoading(true);



await changePassword(

user,

currentPassword,

newPassword

);



setCurrentPassword("");

setNewPassword("");



successToast(
"Password changed. Verification email sent."
);



}
catch(error){


console.log(error);



if(
error.code === 
"auth/wrong-password"
){

errorToast(
"Current password is incorrect."
);

}

else{

errorToast(
error.message
);

}



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
">

Change Password

</h1>




<div className="
bg-white
rounded-3xl
shadow-lg
p-6
md:p-8
max-w-xl
">


<input

type="password"

placeholder="Current Password"

className="
w-full
border
border-gray-200
rounded-2xl
px-5
py-4
mb-5
outline-none
focus:ring-2
focus:ring-black
"

value={currentPassword}

onChange={(e)=>
setCurrentPassword(
e.target.value
)
}

/>




<input

type="password"

placeholder="New Password"

className="
w-full
border
border-gray-200
rounded-2xl
px-5
py-4
mb-6
outline-none
focus:ring-2
focus:ring-black
"

value={newPassword}

onChange={(e)=>
setNewPassword(
e.target.value
)
}

/>





<Button

onClick={handleChangePassword}

disabled={loading}

className="
w-full
rounded-2xl
py-4
text-lg
"

>


{
loading
?
"Updating..."
:
"Change Password"
}


</Button>



</div>



</div>

);


}
