import {
  useState,
} from "react";

import useAuth from "../../hooks/useAuth";

import {
  changePassword,
} from "../../services/authService";

import Button from "../../components/ui/Button";

import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";



export default function ChangePassword(){


  const { user } = useAuth();


  const [newPassword,setNewPassword] =
    useState("");

  const [confirmPassword,setConfirmPassword] =
    useState("");

  const [loading,setLoading] =
    useState(false);





  const handleChangePassword =
  async()=>{


    if(!newPassword || !confirmPassword){

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



    if(newPassword !== confirmPassword){

      errorToast(
        "Passwords do not match."
      );

      return;

    }




    try{


      setLoading(true);



      await changePassword(
        user,
        newPassword
      );



      setNewPassword("");

      setConfirmPassword("");



      successToast(
        "Password changed successfully."
      );



    }catch(error){


      console.log(error);


      errorToast(
        error.message
      );


    }finally{


      setLoading(false);


    }


  };





  return (

    <div>


      <h1 className="text-3xl font-bold mb-8">

        Change Password

      </h1>




      <div className="bg-white rounded-3xl shadow p-8">


        <input

          type="password"

          className="
          w-full
          border
          rounded-xl
          p-3
          mb-4
          "

          placeholder="New Password"

          value={newPassword}

          onChange={(e)=>
            setNewPassword(
              e.target.value
            )
          }

        />




        <input

          type="password"

          className="
          w-full
          border
          rounded-xl
          p-3
          "

          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e)=>
            setConfirmPassword(
              e.target.value
            )
          }

        />




        <Button

          onClick={handleChangePassword}

          disabled={loading}

          className="w-full mt-6"

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
