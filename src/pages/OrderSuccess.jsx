import {
  Link,
  useLocation,
} from "react-router-dom";



export default function OrderSuccess(){


  const location =
    useLocation();



  const orderId =
    location.state?.orderId;




  return (

    <div className="min-h-screen flex items-center justify-center px-6">


      <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-lg w-full">


        <div className="text-6xl mb-6">

          ✅

        </div>




        <h1 className="text-4xl font-bold text-green-600">

          Order Successful

        </h1>




        <p className="mt-4 text-gray-600">

          Thank you for your purchase.

          Your order has been placed successfully.

        </p>






        {
          orderId && (

            <div className="mt-6 bg-gray-100 rounded-xl p-4">


              <p className="font-bold">

                Order ID

              </p>



              <p className="text-sm break-all mt-2">

                {orderId}

              </p>



            </div>

          )

        }






        <div className="flex flex-col gap-4 mt-8">



          <Link

            to="/my-orders"

            className="bg-primary text-white py-3 rounded-xl font-semibold"

          >

            View My Orders

          </Link>





          <Link

            to="/shop"

            className="border py-3 rounded-xl font-semibold"

          >

            Continue Shopping

          </Link>




        </div>




      </div>


    </div>


  );

}
