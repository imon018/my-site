import {
  useState,
} from "react";


import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";


import {
  doc,
  deleteDoc,
} from "firebase/firestore";


import useAuth from "../../hooks/useAuth";


import {
  db,
} from "../../firebase/firestore";


import Button from "../../components/ui/Button";


import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";


import {
  useNavigate,
} from "react-router-dom";




export default function DeleteAccount(){


  const { user } = useAuth();


  const navigate =
    useNavigate();



  const [password,setPassword] =
    useState("");


  const [loading,setLoading] =
    useState(false);






  const handleDelete =
  async()=>{


    if(!password){

      errorToast(
        "Enter your password."
      );

      return;

    }



    const confirm =
      window.confirm(
        "Delete your account permanently?"
      );



    if(!confirm)
      return;





    try{


      setLoading(true);



      const credential =
        EmailAuthProvider.credential(

          user.email,

          password

        );



      await reauthenticateWithCredential(

        user,

        credential

      );




      await deleteDoc(

        doc(

          db,

          "users",

          user.uid

        )

      );




      await deleteUser(user);



      successToast(
        "Account deleted successfully."
      );



      navigate("/");



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


      <h1 className="text-3xl font-bold mb-8 text-red-600">

        Delete Account

      </h1>




      <div className="bg-white rounded-3xl shadow p-8">


        <p className="text-gray-600 mb-5">

          This action cannot be undone.

        </p>




        <input

          type="password"

          className="
          w-full
          border
          rounded-xl
          p-3
          "

          placeholder="Enter your password"

          value={password}

          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }

        />




        <Button

          onClick={handleDelete}

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
            "Deleting..."
            :
            "Delete Account"
          }


        </Button>


      </div>


    </div>

  );

}
