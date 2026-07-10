// src/pages/Checkout.jsx

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


  const navigate = useNavigate();


  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [deliveryArea, setDeliveryArea] =
    useState("");

  const [loading, setLoading] =
  useState(false);



  useEffect(() => {

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
      ? 80
      :
    deliveryArea === "Dhaka Sub Area"
      ? 100
      :
    deliveryArea === "Outside Dhaka"
      ? 120
      :
      0;



  const total =
    subtotal + deliveryCharge;



  const handleOrder =
async()=>{

  if(loading) return;

  setLoading(true);


    if(!user){

      errorToast(
        "Login required"
      );

      navigate("/login");

      return;

    }



    if(cart.length === 0){

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

          userId:user.uid,

          customerName:name,

          email:user.email,

          phone,

          address,

          deliveryArea,

          deliveryCharge,

          items:cart,

          subtotal,

          total,

          status:"Pending",

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
finally{

  setLoading(false);

}


  };



  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-gray-50
      via-white
      to-blue-50
      px-4
      md:px-6
      py-12
    ">


      <div className="
        max-w-6xl
        mx-auto
      ">


        <div className="
          text-center
          mb-12
        ">


          <span className="
            inline-flex
            px-5
            py-2
            rounded-full
            bg-blue-100
            text-blue-700
            font-semibold
          ">
            🔒 Secure Checkout
          </span>



          <h1 className="
            mt-5
            text-4xl
            md:text-6xl
            font-black
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            bg-clip-text
            text-transparent
          ">
            Complete Your Order
          </h1>



          <p className="
            mt-3
            text-gray-500
          ">
            Premium shopping experience with trusted delivery
          </p>


        </div>





        <div className="
          grid
          lg:grid-cols-2
          gap-8
        ">



          {/* CUSTOMER INFO */}

          <div className="
            bg-white/80
            backdrop-blur
            rounded-[32px]
            shadow-xl
            border
            border-gray-100
            p-6
            md:p-8
          ">


            <h2 className="
              text-2xl
              font-black
              mb-8
            ">
              Customer Information
            </h2>



            <input
              className="
                w-full
                p-4
                rounded-2xl
                border
                mb-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              placeholder="Full Name"
              value={name}
              onChange={(e)=>
                setName(e.target.value)
              }
            />



            <input
              className="
                w-full
                p-4
                rounded-2xl
                border
                mb-4
                bg-gray-100
              "
              value={
                user?.email || ""
              }
              readOnly
            />



            <input
              className="
                w-full
                p-4
                rounded-2xl
                border
                mb-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              placeholder="Phone Number"
              value={phone}
              onChange={(e)=>
                setPhone(e.target.value)
              }
            />



            <textarea
              className="
                w-full
                p-4
                rounded-2xl
                border
                mb-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              rows="4"
              placeholder="Shipping Address"
              value={address}
              onChange={(e)=>
                setAddress(e.target.value)
              }
            />



            <select
              className="
                w-full
                p-4
                rounded-2xl
                border
                outline-none
              "
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

                    {/* ORDER SUMMARY */}


          <div className="
            bg-white/90
            backdrop-blur
            rounded-[32px]
            shadow-xl
            border
            border-gray-100
            p-6
            md:p-8
          ">


            <h2 className="
              text-2xl
              font-black
              mb-8
            ">
              Order Summary
            </h2>




            <div className="
              space-y-5
            ">


              {
                cart.length === 0 ? (

                  <div className="
                    text-center
                    py-10
                    text-gray-400
                  ">
                    Your cart is empty
                  </div>

                ) : (


                cart.map((item)=>(

                  <div
                    key={item.id}
                    className="
                      flex
                      gap-4
                      items-center
                      border-b
                      pb-5
                    "
                  >


                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/120"
                      }
                      alt={item.name}
                      className="
                        w-24
                        h-24
                        rounded-2xl
                        object-cover
                      "
                    />



                    <div className="
                      flex-1
                    ">


                      <h3 className="
                        font-bold
                        text-lg
                      ">
                        {item.name}
                      </h3>



                      <p className="
                        text-gray-500
                        text-sm
                      ">
                        Quantity:
                        {" "}
                        {item.quantity || 1}
                      </p>



                      <p className="
                        mt-2
                        font-black
                      ">
                        ৳
                        {
                          item.price *
                          (item.quantity || 1)
                        }
                      </p>


                    </div>


                  </div>


                ))

                )

              }


            </div>





            <div className="
              mt-8
              space-y-4
            ">



              <div className="
                flex
                justify-between
                text-gray-600
              ">

                <span>
                  Subtotal
                </span>

                <b>
                  ৳ {subtotal}
                </b>

              </div>




              <div className="
                flex
                justify-between
                text-gray-600
              ">

                <span>
                  Delivery Charge
                </span>

                <b>
                  ৳ {deliveryCharge}
                </b>

              </div>





              <div className="
                flex
                justify-between
                text-xl
                font-black
                border-t
                pt-5
              ">


                <span>
                  Total
                </span>


                <span className="
                  text-blue-600
                ">
                  ৳ {total}
                </span>


              </div>



            </div>






            {/* TRUST SECTION */}


            <div className="
              mt-8
              space-y-3
            ">


              <div className="
                p-4
                rounded-2xl
                bg-green-50
                text-green-700
                font-semibold
              ">
                🚚 Fast & Secure Delivery
              </div>



              <div className="
                p-4
                rounded-2xl
                bg-blue-50
                text-blue-700
                font-semibold
              ">
                💵 Cash On Delivery Available
              </div>




              <div className="
                p-4
                rounded-2xl
                bg-purple-50
                text-purple-700
                font-semibold
              ">
                💎 Premium Quality Guarantee
              </div>



            </div>






            <Button
  className="
    w-full
    mt-8
    h-14
    rounded-2xl
    text-lg
    font-bold
    bg-gradient-to-r
    from-blue-600
    to-purple-600
    hover:shadow-2xl
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
  onClick={handleOrder}
  disabled={loading}
>
  {
    loading
      ? "Processing Order..."
      : "Complete Order 🚀"
  }
</Button>



          </div>


        </div>


      </div>


    </div>

  );


}
