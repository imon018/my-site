import {
  useEffect,
  useState,
} from "react";


import useAuth from "../hooks/useAuth";


import {
  getUserProfile,
  updateUserProfile,
} from "../services/userService";


import {
  uploadSingleImage,
} from "../services/uploadService";


import Button from "../components/ui/Button";


import {
  successToast,
  errorToast,
} from "../components/ui/Toast";



export default function Profile(){


  const {
    user,
  } = useAuth();



  const [loading,setLoading] =
    useState(true);


  const [saving,setSaving] =
    useState(false);



  const [name,setName] =
    useState("");


  const [phone,setPhone] =
    useState("");


  const [address,setAddress] =
    useState("");



  const [photoURL,setPhotoURL] =
    useState("");


  const [photoFile,setPhotoFile] =
    useState(null);







  useEffect(()=>{


    const loadProfile =
    async()=>{


      if(!user){

        setLoading(false);

        return;

      }



      try{


        const profile =
          await getUserProfile(
            user.uid
          );



        if(profile){


          setName(
            profile.name || ""
          );


          setPhone(
            profile.phone || ""
          );


          setAddress(
            profile.address || ""
          );


          setPhotoURL(
            profile.photoURL || ""
          );


        }



      }catch(error){


        console.log(error);


        errorToast(
          "Failed to load profile."
        );


      }finally{


        setLoading(false);


      }


    };



    loadProfile();



  },[user]);








  const profileCompletion =
  (
    [
      name,
      phone,
      address,
      photoURL,

    ].filter(Boolean).length / 4

  ) * 100;







  const handleSave =
  async()=>{


    if(!user)
      return;





    if(phone){


      const phoneRegex =
      /^01[3-9]\d{8}$/;



      if(!phoneRegex.test(phone)){


        errorToast(
          "Enter valid Bangladesh phone number."
        );


        return;

      }


    }







    try{


      setSaving(true);



      let imageUrl =
        photoURL;





      if(photoFile){


        const uploaded =
          await uploadSingleImage(
            photoFile
          );



        imageUrl =
          uploaded.imageUrl;


      }







      await updateUserProfile(

        user.uid,

        {

          name,

          phone,

          address,

          photoURL:imageUrl,

        }

      );





      setPhotoURL(
        imageUrl
      );


      setPhotoFile(null);





      successToast(
        "Profile updated successfully."
      );



    }catch(error){


      console.log(error);


      errorToast(
        error.message
      );



    }finally{


      setSaving(false);


    }


  };








  const handleRemovePhoto =
  async()=>{


    try{


      setPhotoURL("");

      setPhotoFile(null);




      await updateUserProfile(

        user.uid,

        {

          photoURL:"",

        }

      );




      successToast(
        "Profile photo removed."
      );



    }catch(error){


      errorToast(
        error.message
      );


    }


  };








  if(!user){


    return (

      <div className="max-w-6xl mx-auto py-20 text-center">

        Please login first.

      </div>

    );


  }





  if(loading){


    return (

      <div className="max-w-6xl mx-auto py-20 text-center">

        Loading Profile...

      </div>

    );


  }





  return (

    <div className="max-w-6xl mx-auto px-6 py-12">


      <h1 className="text-4xl font-bold mb-8">

        My Profile

      </h1>



      <div className="grid lg:grid-cols-3 gap-8">



        {/* Profile Card */}


        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">


          <img

            src={
              photoURL ||
              "https://via.placeholder.com/200"
            }

            alt="Profile"

            className="
            w-40
            h-40
            rounded-full
            object-cover
            mx-auto
            border-4
            shadow-lg
            "

          />



          <input

            type="file"

            accept="image/*"

            disabled={saving}

            className="mt-5 w-full"

            onChange={(e)=>

              setPhotoFile(
                e.target.files[0]
              )

            }

          />



          {
            photoURL && (

              <button

                onClick={handleRemovePhoto}

                disabled={saving}

                className="mt-3 text-red-600"

              >

                Remove Photo

              </button>

            )
          }

                    <h2 className="text-2xl font-bold mt-6">

            {name || "Dream Mode User"}

          </h2>



          <p className="text-gray-500 mt-2">

            {user.email}

          </p>






          <div className="mt-6 text-left">


            <div className="flex justify-between mb-2">


              <span>

                Profile Completion

              </span>



              <span className="font-bold">

                {Math.round(profileCompletion)}%

              </span>


            </div>




            <div className="w-full bg-gray-200 rounded-full h-3">


              <div

                className="bg-primary h-3 rounded-full"

                style={{

                  width:
                  `${profileCompletion}%`

                }}

              />


            </div>


          </div>



        </div>






        {/* Edit Profile */}


        <div className="lg:col-span-2">


          <div className="bg-white rounded-3xl shadow-xl p-8">


            <h2 className="text-2xl font-bold mb-6">

              Edit Profile

            </h2>




            <div className="grid md:grid-cols-2 gap-5">



              <input

                className="border rounded-xl p-3"

                placeholder="Name"

                value={name}

                onChange={(e)=>

                  setName(
                    e.target.value
                  )

                }

              />





              <input

                className="border rounded-xl p-3 bg-gray-100"

                value={
                  user.email
                }

                readOnly

              />






              <input

                className="border rounded-xl p-3"

                placeholder="Phone"

                value={phone}

                onChange={(e)=>

                  setPhone(
                    e.target.value
                  )

                }

              />






              <input

                className="border rounded-xl p-3"

                placeholder="Address"

                value={address}

                onChange={(e)=>

                  setAddress(
                    e.target.value
                  )

                }

              />



            </div>





            <Button

              onClick={handleSave}

              disabled={saving}

              className="w-full mt-6"

            >

              {
                saving
                ?
                "Saving..."
                :
                "Save Changes"
              }


            </Button>



          </div>



        </div>




      </div>



    </div>


  );


}
