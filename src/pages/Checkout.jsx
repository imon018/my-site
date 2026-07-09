import { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

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



  const [deliveryArea,setDeliveryArea] =
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








  const subtotal =
    cart.reduce(

      (sum,item)=>

      sum +
      item.price *
      (item.quantity || 1),

      0

    );






  const deliveryCharge =

    deliveryArea === "Dhaka City"

    ?

    80

    :

    deliveryArea === "Dhaka Sub Area"

    ?

    100

    :

    deliveryArea === "Outside Dhaka"

    ?

    120

    :

    0;





  const total =
    subtotal + deliveryCharge;









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





    if(!deliveryArea){

      errorToast(
        "Please select delivery area"
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


          deliveryArea,


          deliveryCharge,


          items:
            cart,


          subtotal,


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

            className="w-full border rounded-xl p-3 mb-4"

            placeholder="Shipping Address"

            rows="4"

            value={address}

            onChange={(e)=>
              setAddress(e.target.value)
            }

          />






          <select

            className="w-full border rounded-xl p-3"

            value={deliveryArea}

            onChange={(e)=>

              setDeliveryArea(
                e.target.value
              )

            }

          >

            <option value="">
              Select Delivery Area
            </option>


            <option value="Dhaka City">
              Dhaka City - ৳80
            </option>


            <option value="Dhaka Sub Area">
              Dhaka Sub Area - ৳100
            </option>


            <option value="Outside Dhaka">
              Outside Dhaka - ৳120
            </option>


          </select>



        </div>









        <div className="bg-white rounded-3xl shadow p-6">


          <h2 className="text-2xl font-bold mb-6">

            Order Summary

          </h2>







          <div className="space-y-5">


          {
            cart.map((item)=>(


              <div

                key={item.id}

                className="border-b pb-5"

              >





                <div className="flex gap-4">


                  <img

                    src={
                      item.image ||
                      "https://via.placeholder.com/120"
                    }

                    alt={item.name}

                    className="w-28 h-28 rounded-2xl object-cover"

                  />





                  <div className="flex-1">


                    <h3 className="font-bold text-lg">

                      {item.name}

                    </h3>




                    <p className="text-gray-500">

                      Quantity:
                      {" "}
                      {item.quantity || 1}

                    </p>




                    <p className="font-bold mt-2">

                      ৳
                      {
                        item.price *
                        (item.quantity || 1)
                      }

                    </p>




                    <Link

                      to={`/product/${item.id}`}

                      className="inline-block mt-3 text-blue-600 font-semibold"

                    >

                      View Product

                    </Link>



                  </div>



                </div>



              </div>


            ))

          }


          </div>








          <div className="mt-6 space-y-3">


            <div className="flex justify-between">

              <span>
                Subtotal
              </span>


              <span className="font-bold">

                ৳ {subtotal}

              </span>


            </div>






            <div className="flex justify-between">

              <span>
                Delivery Charge
              </span>


              <span className="font-bold">

                ৳ {deliveryCharge}

              </span>


            </div>







            <div className="flex justify-between text-xl font-bold border-t pt-4">

              <span>
                Total
              </span>


              <span>

                ৳ {total}

              </span>


            </div>



          </div>






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
