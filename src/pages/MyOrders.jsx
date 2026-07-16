import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import useAuth from "../hooks/useAuth";

import {
  FiPackage,
  FiChevronRight,
  FiFilter,
} from "react-icons/fi";

import {
  getUserOrders,
} from "../services/orderService";

import {
  errorToast,
} from "../components/ui/Toast";

export default function MyOrders() {

  const { user } = useAuth();

  const navigate = useNavigate();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [showFilter, setShowFilter] =
    useState(false);

      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
        relative
        flex
        items-center
        justify-center
        mb-4
        "
      >

        <h1
          className="
          text-lg
          md:text-2xl
          font-bold
          "
        >
          My Orders
        </h1>

        <div
          className="
          absolute
          right-0
          "
        >

          <button
            onClick={() =>
              setFilterOpen(!filterOpen)
            }
            className="
            w-10
            h-10
            rounded-lg
            border
            border-gray-100
            bg-white
            shadow-sm
            flex
            items-center
            justify-center
            "
          >
            <FiFilter size={18}/>
          </button>

          {

            filterOpen && (

              <div
                className="
                absolute
                right-0
                top-12
                w-44
                bg-white
                border
                border-gray-100
                rounded-lg
                shadow-lg
                overflow-hidden
                z-50
                "
              >

                {

                  [
                    "All",
                    "Pending",
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((item)=>(

                    <button

                      key={item}

                      onClick={()=>{

                        setFilter(item);

                        setFilterOpen(false);

                      }}

                      className={`
                      w-full
                      px-4
                      py-3
                      text-left
                      text-sm

                      ${
                        filter===item
                        ?
                        "bg-amber-50 text-amber-600 font-bold"
                        :
                        "hover:bg-gray-50"
                      }
                      `}
                    >

                      {item}

                    </button>

                  ))

                }

              </div>

            )

          }

        </div>

      </div>



      {/* SUMMARY */}

      <div
        className="
        bg-white
        border
        border-gray-100
        rounded-lg
        shadow-sm
        p-4
        flex
        justify-between
        items-center
        "
      >

        <div
          className="
          flex
          gap-8
          "
        >

          <div>

            <p
              className="
              text-xs
              text-gray-500
              "
            >
              Total Orders
            </p>

            <h2
              className="
              text-2xl
              font-black
              "
            >
              {filteredOrders.length}
            </h2>

          </div>

          <div>

            <p
              className="
              text-xs
              text-gray-500
              "
            >
              Total Spent
            </p>

            <h2
              className="
              text-2xl
              font-black
              "
            >
              ৳ {totalSpent}
            </h2>

          </div>

        </div>

        <div
          className="
          w-12
          h-12
          rounded-full
          bg-amber-50
          flex
          items-center
          justify-center
          text-xl
          "
        >
          📦
        </div>

      </div>



      {/* ORDER LIST */}

      <div
        className="
        space-y-4
        "
      >

        {

          filteredOrders.map((order)=>{

            const item =
              order.items?.[0];

            return(

              <div

                key={order.id}

                className="
                bg-white
                border
                border-gray-100
                rounded-lg
                shadow-sm
                p-4
                "
              >

                                {/* HEADER */}

                <div
                  className="
                  flex
                  justify-between
                  items-start
                  "
                >

                  <div>

                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      "
                    >

                      <span className="text-amber-500">
                        📦
                      </span>

                      <h2
                        className="
                        text-base
                        font-bold
                        "
                      >
                        Order #

                        {order.id.slice(0,8)}

                      </h2>

                    </div>

                    <p
                      className="
                      text-xs
                      text-gray-500
                      mt-1
                      "
                    >
                      {

                        new Date(
                          order.createdAt
                        ).toLocaleString()

                      }
                    </p>

                  </div>



                  <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-bold

                    ${statusStyle(
                      order.status
                    )}

                    `}
                  >

                    {order.status}

                  </span>

                </div>



                <hr
                  className="
                  my-4
                  border-gray-100
                  "
                />



                {/* PRODUCT */}

                <div
                  className="
                  flex
                  justify-between
                  items-center
                  "
                >

                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >

                    <img

                      src={
                        item?.image ||

                        "https://via.placeholder.com/70"
                      }

                      className="
                      w-16
                      h-16
                      rounded-lg
                      object-cover
                      bg-gray-50
                      "

                    />



                    <div>

                      <h3
                        className="
                        text-sm
                        font-bold
                        "
                      >
                        {

                          item?.name ||

                          "Product"

                        }
                      </h3>

                      <p
                        className="
                        text-xs
                        text-gray-500
                        mt-1
                        "
                      >
                        Qty :

                        {" "}

                        {

                          item?.quantity ||

                          1

                        }
                      </p>

                    </div>

                  </div>



                  <p
                    className="
                    text-lg
                    font-black
                    "
                  >

                    ৳

                    {

                      (item?.price || 0)

                      *

                      (item?.quantity || 1)

                    }

                  </p>

                </div>



                <hr
                  className="
                  my-4
                  border-gray-100
                  "
                />

                                {/* VIEW DETAILS */}

                <button

                  onClick={() =>
                    navigate(
                      "#"
                    )
                  }

                  className="
                  w-full
                  flex
                  items-center
                  justify-between
                  text-sm
                  font-bold
                  text-amber-600
                  "

                >

                  <span>

                    View Details

                  </span>

                  <FiChevronRight
                    size={18}
                  />

                </button>

              </div>

            );

          })

        }

      </div>

    </div>

  );

}
