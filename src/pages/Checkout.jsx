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


      const orderId =
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
        "/order-success",
        {
          state:{
            orderId
          }
        }
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





        <div className="bg-white rounded-3xl shadow p-6">


          <h2 className="text-2xl font-bold mb-6">

            User Information

          </h2>




          <input

            className="w-full border rounded-xl p-3 mb-4"

            placeholder="Full Name"

            value={name}

            onChange={(e)=>
              setName(e.target.value)
            }

          />




          <input

            className="w-full border rounded-xl p-3 mb-4 bg-gray-100"

            value={
              user?.email || ""
            }

            readOnly

          />





          <input

            className="w-full border rounded-xl p-3 mb-4"

            placeholder="Phone Number"

            value={phone}

            onChange={(e)=>
              setPhone(e.target.value)
            }

          />





          <textarea

            className="w-full border rounded-xl p-3"

            placeholder="Shipping Address"

            rows="4"

            value={address}

            onChange={(e)=>
              setAddress(e.target.value)
            }

          />



        </div>








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





          <h2 className="text-2xl font-bold mt-6">

            Total:
            ৳ {total}

          </h2>




          <Button

            className="w-full mt-6"

            onClick={handleOrder}

          >

            Place Order

          </Button>




        </div>






      </div>


    </div>

  );

}
