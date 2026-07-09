import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderService";


export default function Orders() {


  const [orders, setOrders] =
    useState([]);


  const [loading, setLoading] =
    useState(true);




  useEffect(() => {

    loadOrders();

  }, []);




  const loadOrders = async () => {

    try {

      const data =
        await getAllOrders();

      setOrders(data);

    } catch(error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };






  const handleStatusChange = async (
    id,
    status
  ) => {


    try {


      await updateOrderStatus(
        id,
        status
      );



      setOrders((prev)=>

        prev.map(order=>

          order.id === id

          ?

          {
            ...order,
            status
          }

          :

          order

        )

      );


    } catch(error){

      console.log(error);

    }


  };






  if(loading){

    return (

      <p className="text-center">

        Loading orders...

      </p>

    );

  }








  return (


    <div>


      <h1 className="text-3xl font-bold mb-8">

        Orders Management

      </h1>







      {
        orders.length === 0

        ?

        (

          <p>

            No orders found

          </p>

        )

        :

        (

          <div className="space-y-6">


          {
            orders.map(order=>(


              <div

                key={order.id}

                className="bg-white rounded-3xl shadow p-6"

              >




                <div className="flex justify-between items-start border-b pb-4">


                  <div>


                    <h2 className="font-bold text-lg">

                      Customer Information

                    </h2>


                    <p>

                      Name:
                      {" "}
                      {order.customerName}

                    </p>


                    <p>

                      Email:
                      {" "}
                      {order.email}

                    </p>


                    <p>

                      Phone:
                      {" "}
                      {order.phone}

                    </p>


                    <p>

                      Address:
                      {" "}
                      {order.address}

                    </p>


                  </div>




                  <select

                    value={
                      order.status ||
                      "Pending"
                    }

                    onChange={(e)=>

                      handleStatusChange(

                        order.id,

                        e.target.value

                      )

                    }

                    className="border rounded-xl px-4 py-2"

                  >

                    <option>
                      Pending
                    </option>

                    <option>
                      Processing
                    </option>

                    <option>
                      Shipped
                    </option>

                    <option>
                      Delivered
                    </option>

                    <option>
                      Cancelled
                    </option>


                  </select>



                </div>








                <div className="mt-5">


                  <h3 className="font-bold mb-3">

                    Products

                  </h3>




                  {
                    order.items?.map(item=>(


                      <div

                        key={item.id}

                        className="flex justify-between border-b py-3"

                      >


                        <span>

                          {item.name}
                          {" "}
                          ×
                          {" "}
                          {item.quantity}

                        </span>



                        <span>

                          ৳
                          {
                            item.price *
                            item.quantity

                          }

                        </span>


                      </div>


                    ))

                  }


                </div>









                <div className="mt-5 flex justify-between font-bold text-lg">


                  <span>

                    Total

                  </span>


                  <span>

                    ৳ {order.total}

                  </span>


                </div>







                <div className="mt-3 text-gray-500 text-sm">


                  Order Date:

                  {" "}

                  {
                    new Date(
                      order.createdAt
                    ).toLocaleString()
                  }


                </div>





              </div>


            ))

          }


          </div>


        )

      }





    </div>


  );

}
