import { useState } from "react";

import {
  addSubscriber,
} from "../services/newsletterService";

import {
  successToast,
  errorToast,
} from "./ui/Toast";


export default function Newsletter() {


  const [email,setEmail] =
    useState("");

  const [loading,setLoading] =
    useState(false);



  const submitHandler =
  async(e)=>{


    e.preventDefault();


    if(!email){

      errorToast(
        "Please enter your email"
      );

      return;

    }



    try{


      setLoading(true);


      await addSubscriber(email);



      successToast(
        "Subscribed successfully"
      );


      setEmail("");



    }catch(error){


      console.log(error);


      errorToast(
        "Something went wrong"
      );


    }
    finally{

      setLoading(false);

    }


  };





  return (

    <section className="
      pb-20
    ">


      <div className="
        container-box
      ">


        <div className="
          rounded-[40px]
          bg-white
          border
          border-slate-200
          shadow-premium
          px-6
          py-10
          md:px-12
          md:py-14
          text-center
        ">


          <h2 className="
            text-3xl
            md:text-4xl
            font-black
            text-blue-950
          ">
            Stay Updated
          </h2>



          {/* Gold underline */}

          <div className="
            w-full
            max-w-xs
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-yellow-500
            to-transparent
            mx-auto
            mt-4
          "/>



          <p className="
            mt-5
            text-gray-500
          ">
            Subscribe to get special offers,
            free gifts and exclusive deals.
          </p>



          <form
            onSubmit={submitHandler}

            className="
              mt-8
              flex
              flex-col
              md:flex-row
              gap-3
              max-w-xl
              mx-auto
            "
          >


            <input

              type="email"

              placeholder="Enter your email"

              value={email}

              onChange={(e)=>
                setEmail(e.target.value)
              }


              className="
                flex-1
                rounded-2xl
                border
                border-gray-200
                px-5
                py-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />



            <button

              disabled={loading}

              className="
                rounded-2xl
                px-8
                py-4
                bg-blue-900
                text-white
                font-bold
                hover:bg-blue-800
                transition
              "

            >

              {
                loading
                ?
                "Sending..."
                :
                "Subscribe"
              }


            </button>


          </form>


        </div>


      </div>


    </section>

  );

}
