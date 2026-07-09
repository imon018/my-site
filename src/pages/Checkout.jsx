import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

import Button from "../components/ui/Button";

import {
  createOrder,
} from "../services/orderService";

import {
  successToast,
  errorToast,
} from "../components/ui/Toast";



export default function Checkout() {


  const {
    cart,
    clearCart,
  } = useCart();



  const {
    user,
  } = useAuth();



  const navigate =
    useNavigate();





  const [name,setName] =
    useState("");

  const [phone,setPhone] =
    useState("");

  const [address,setAddress] =
    useState("");





  useEffect(()=>{


    if(user){


      setName(
        user.name || ""
      );


      setPhone(
        user.phone || ""
      );


      setAddress(
        user.address || ""
      );


    }


  },[user]);







  const total =
    cart.reduce(

      (sum,item)=>

        sum +
        item.price *
        (item.quantity || 1),

      0

    );








  const handleOrder =
    async()=>{



      if(!user){

        errorToast(
          "Login required"
        );

        navigate("/login");

        return;

      }





      if(cart.length===0){

        errorToast(
          "Cart is empty"
        );

        return;

      }






      if(
        !name ||
        !phone ||
        !address
      ){

        errorToast(
          "Please fill all information"
        );

        return;

      }







      try{


        await createOrder({


          userId:
            user.uid,


          customerName:
            name,


          email:
            user.email,


          phone,


          address,



          items:
            cart,



          total,



          status:
            "Pending",



          createdAt:
            new Date()
            .toISOString(),



        });





        successToast(
          "Order placed successfully!"
        );



        clearCart();



        navigate(
          "/order-success"
        );



      }catch(error){


        console.log(error);



        errorToast(
          error.message ||
          "Failed to place order"
        );


      }


    };









  return (


    <div className="max-w-5xl mx-auto px-6 py-12">


      <h1 className="text-4xl font-bold mb-8">

        Checkout

      </h1>







      <div className="grid md:grid-cols-2 gap-8">





        {/* Customer Information */}


        <div className="bg-white rounded-3xl shadow p-6">


          <h2 className="text-2xl font-bold mb-6">

            User Information

          </h2>




          <label className="block mb-2 font-medium">

            Full Name

          </label>


          <input

            className="w-full border rounded-xl p-3 mb-5"

            value={name}

            onChange={(e)=>
              setName(e.target.value)
            }

          />






          <label className="block mb-2 font-medium">

            Email

          </label>


          <input

            className="w-full border rounded-xl p-3 mb-5 bg-gray-100"

            value={
              user?.email || ""
            }

            readOnly

          />








          <label className="block mb-2 font-medium">

            Phone Number

          </label>


          <input

            className="w-full border rounded-xl p-3 mb-5"

            value={phone}

            onChange={(e)=>
              setPhone(e.target.value)
            }

          />






          <label className="block mb-2 font-medium">

            Shipping Address

          </label>


          <textarea

            className="w-full border rounded-xl p-3"

            rows="4"

            value={address}

            onChange={(e)=>
              setAddress(e.target.value)
            }

          />



        </div>








        {/* Order Summary */}



        <div className="bg-white rounded-3xl shadow p-6">


          <h2 className="text-2xl font-bold mb-6">

            Order Summary

          </h2>





          {
            cart.map((item)=>(


              <div

                key={item.id}

                className="flex justify-between border-b py-3"

              >


                <span>

                  {item.name}

                  {" x "}

                  {item.quantity || 1}

                </span>



                <span>

                  ৳
                  {
                    item.price *
                    (item.quantity || 1)

                  }

                </span>



              </div>


            ))

          }






          <div className="flex justify-between text-2xl font-bold mt-6">


            <span>

              Total

            </span>


            <span>

              ৳ {total}

            </span>


          </div>






          <Button

            className="w-full mt-8"

            onClick={handleOrder}

          >

            Place Order

          </Button>





        </div>






      </div>





    </div>


  );

}
