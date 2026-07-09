import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

import { getUserOrders } from "../services/orderService";

import {
  errorToast,
} from "../components/ui/Toast";

export default function MyOrders() {

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadOrders = async () => {

      if (!user) {

        setLoading(false);

        return;

      }

      try {

        const data =
          await getUserOrders(
            user.email
          );

        setOrders(data);

      } catch (err) {

        console.log(err);

        errorToast(
          "Failed to load orders."
        );

      }

      setLoading(false);

    };

    loadOrders();

  }, [user]);

  if (!user) {

    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        Please login first.
      </div>
    );

  }

  if (loading) {

    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        Loading Orders...
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">

        My Orders

      </h1>

      {orders.length === 0 ? (

        <div className="bg-white rounded-2xl shadow p-8 text-center">

          No Orders Found.

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <div className="flex justify-between">

                <h2 className="font-bold">

                  Order ID

                </h2>

                <span className="text-sm">

                  {order.id}

                </span>

              </div>

              <div className="mt-4 flex justify-between">

                <span>Total</span>

                <span>

                  ৳ {order.total}

                </span>

              </div>

              <div className="mt-2 flex justify-between">

                <span>Status</span>

                <span className="text-blue-600 font-semibold">

                  {order.status}

                </span>

              </div>

              <div className="mt-2 flex justify-between">

                <span>Date</span>

                <span>

                  {new Date(
                    order.createdAt
                  ).toLocaleString()}

                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}
