import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FiArrowLeft,
  FiSave
} from "react-icons/fi";

import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";

import {
  updateUserProfile
} from "../services/userService";



export default function ProfileEditPage(){

  const {
    user,
    setUser
  } = useAuth();


  const navigate = useNavigate();


  const [loading,setLoading] = useState(false);



  const [formData,setFormData] = useState({

    name:"",
    phone:"",
    address:"",
    postOffice:"",
    thana:"",
    district:""

  });



  useEffect(()=>{

    if(user){

      setFormData({

        name:user.name || "",

        phone:user.phone || "",

        address:user.address || "",

        postOffice:user.postOffice || "",

        thana:user.thana || "",

        district:user.district || ""

      });

    }


  },[user]);




  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };





  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{

      setLoading(true);


      await updateUserProfile(
        user.uid,
        formData
      );


      setUser({

        ...user,

        ...formData

      });


      toast.success(
        "Profile updated successfully"
      );


      navigate(-1);


    }
    catch(error){

      toast.error(
        error.message
      );

    }
    finally{

      setLoading(false);

    }

  };





  return (

    <div className="min-h-screen bg-warm px-4 py-6">


      <button

        onClick={()=>navigate(-1)}

        className="flex items-center gap-2 mb-6"

      >

        <FiArrowLeft/>

        Back

      </button>




      <div className="bg-white rounded-3xl p-6 shadow">


        <h1 className="text-2xl font-semibold mb-6">

          Edit Profile

        </h1>



        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >



          <Input

            label="Name"

            name="name"

            value={formData.name}

            onChange={handleChange}

          />



          <Input

            label="Phone Number"

            name="phone"

            value={formData.phone}

            onChange={handleChange}

          />



          <Input

            label="Address"

            name="address"

            value={formData.address}

            onChange={handleChange}

          />



          <Input

            label="Post Office"

            name="postOffice"

            value={formData.postOffice}

            onChange={handleChange}

          />



          <Input

            label="Thana"

            name="thana"

            value={formData.thana}

            onChange={handleChange}

          />



          <Input

            label="District"

            name="district"

            value={formData.district}

            onChange={handleChange}

          />




          <button

            disabled={loading}

            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-xl"

          >

            <FiSave/>

            {
              loading
              ?
              "Saving..."
              :
              "Save Changes"
            }

          </button>



        </form>



      </div>



    </div>

  );

}





function Input({

  label,

  name,

  value,

  onChange

}){


return (

<div>


<label className="block mb-2 text-gray-600">

{label}

</label>


<input

name={name}

value={value}

onChange={onChange}

className="w-full border rounded-xl px-4 py-3 outline-none"

/>


</div>

);


}
