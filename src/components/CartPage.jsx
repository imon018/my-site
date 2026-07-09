import useCart from "../hooks/useCart";

import useAuth from "../hooks/useAuth";

import Button from "./ui/Button";

import { useNavigate } from "react-router-dom";



export default function CartPage() {


  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();



  const { user } =
    useAuth();



  const navigate =
    useNavigate();






  const total = cart.reduce(

    (sum, item) =>

      sum +
      item.price *
      item.quantity,

    0

  );







  const handleCheckout = () => {



    if(!user){

      navigate(
        "/login?redirect=checkout"
      );

      return;

    }




    navigate("/checkout");


  };







  return (

    <div className="max-w-6xl mx-auto px-6 py-12">



      <h1 className="text-4xl font-bold mb-8">

        Shopping Cart

      </h1>






      {
        cart.length === 0

        ?

        (

          <div className="text-center py-20">


            <h2 className="text-2xl font-bold">

              Your cart is empty

            </h2>



          </div>


        )

        :

        (



          <div className="space-y-5">






            {
              cart.map((item)=>(


                <div

                  key={item.id}

                  className="bg-white shadow rounded-2xl p-5 flex gap-5 items-center"

                >




                  <img

                    src={
                      item.image
                    }

                    alt={
                      item.name
                    }

                    className="w-24 h-24 rounded-xl object-cover"

                  />






                  <div className="flex-1">


                    <h3 className="font-bold text-lg">

                      {item.name}

                    </h3>



                    <p className="text-gray-600">

                      ৳ {item.price}

                    </p>




                    <div className="flex items-center gap-3 mt-3">



                      <button

                        onClick={()=>


                          updateQuantity(

                            item.id,

                            item.quantity - 1

                          )


                        }

                        className="border px-3 rounded"

                      >

                        -

                      </button>





                      <span className="font-bold">

                        {item.quantity}

                      </span>





                      <button

                        onClick={()=>


                          updateQuantity(

                            item.id,

                            item.quantity + 1

                          )


                        }

                        className="border px-3 rounded"

                      >

                        +

                      </button>




                    </div>




                  </div>






                  <Button

                    onClick={()=>

                      removeFromCart(
                        item.id
                      )

                    }

                    className="bg-red-500"

                  >

                    Remove

                  </Button>





                </div>



              ))

            }







            <div className="bg-white shadow rounded-2xl p-6 mt-8">



              <div className="flex justify-between text-2xl font-bold">


                <span>

                  Total

                </span>


                <span>

                  ৳ {total}

                </span>


              </div>







              <Button

                onClick={
                  handleCheckout
                }

                className="w-full mt-6"

              >

                Proceed To Checkout

              </Button>







              <button

                onClick={
                  clearCart
                }

                className="text-red-600 mt-4"

              >

                Clear Cart

              </button>





            </div>






          </div>


        )

      }







    </div>

  );

}
