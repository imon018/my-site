import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiPackage,
  FiEdit,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

import Button from "../../components/ui/Button";

import {
  getProductsFromDB,
  deleteProductFromDB,
} from "../../services/firestoreProductService";

export default function Products() {

  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadProducts();

  }, []);

  async function loadProducts() {

    try {

      const data =
        await getProductsFromDB();

      setProducts(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  async function handleDelete(
    id,
    name
  ) {

    const confirmDelete =
      window.confirm(
        `Delete "${name}" ?`
      );

    if (!confirmDelete)
      return;

    try {

      await deleteProductFromDB(
        id
      );

      setProducts((prev) =>
        prev.filter(
          (item) =>
            item.id !== id
        )
      );

      alert(
        "Product deleted successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Delete failed"
      );

    }

  }

  const filteredProducts =
    products.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  if (loading) {

    return (

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      text-white
      ">
        Loading Products...
      </div>

    );

  }

  return (

    <div className="
    min-h-screen
    text-white
    ">

      {/* HERO */}

      <div className="
      bg-secondary
      border
      border-accent/20
      rounded-3xl
      p-5
      md:p-8
      mb-6
      ">

        <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
        ">

          <div>

            <div className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-accent/10
            border
            border-accent/20
            text-accent
            text-sm
            font-semibold
            mb-4
            ">

              <FiPackage />

              Products Management

            </div>

            <h1 className="
            text-3xl
            md:text-5xl
            font-black
            ">
              Products
            </h1>

            <p className="
            text-gray-400
            mt-3
            ">
              Manage products,
              stock and inventory.
            </p>

          </div>

          <Button
            onClick={() =>
              navigate(
                "/admin/add-product"
              )
            }
            className="
            h-12
            px-6
            bg-accent
            text-black
            font-bold
            rounded-2xl
            flex
            items-center
            gap-2
            "
          >

            <FiPlus />

            Add Product

          </Button>

        </div>

      </div>

      {/* STATS */}

      <div className="
      grid
      grid-cols-2
      gap-4
      mb-6
      ">

        <div className="
        bg-secondary
        border
        border-accent/20
        rounded-3xl
        p-5
        ">

          <p className="
          text-gray-400
          text-sm
          ">
            Total Products
          </p>

          <h2 className="
          text-3xl
          font-black
          mt-2
          ">
            {products.length}
          </h2>

        </div>

        <div className="
        bg-secondary
        border
        border-accent/20
        rounded-3xl
        p-5
        ">

          <p className="
          text-gray-400
          text-sm
          ">
            Search Results
          </p>

          <h2 className="
          text-3xl
          font-black
          mt-2
          ">
            {
              filteredProducts.length
            }
          </h2>

        </div>

      </div>

      {/* SEARCH */}

      <div className="
      relative
      mb-6
      ">

        <FiSearch
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
        />

        <input
          type="text"
          placeholder="
          Search product...
          "
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
          w-full
          bg-secondary
          border
          border-accent/20
          rounded-2xl
          pl-12
          pr-4
          py-4
          outline-none
          "
        />

      </div>

      {/* EMPTY STATE */}

      {filteredProducts.length === 0 ? (

        <div className="
        bg-secondary
        border
        border-accent/20
        rounded-3xl
        p-10
        text-center
        ">

          <h3 className="
          text-2xl
          font-bold
          ">
            No Products Found
          </h3>

          <p className="
          text-gray-400
          mt-3
          ">
            Try another search keyword.
          </p>

        </div>

      ) : (

        <>
          {/* MOBILE CARDS */}

          <div className="
          lg:hidden
          space-y-4
          ">

            {filteredProducts.map(
              (product) => (

              <div
                key={product.id}
                className="
                bg-secondary
                border
                border-accent/20
                rounded-3xl
                overflow-hidden
                shadow-xl
                "
              >

                <div className="
                relative
                ">

                  {product.image ? (

                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      className="
                      w-full
                      h-56
                      object-cover
                      "
                    />

                  ) : (

                    <div className="
                    h-56
                    flex
                    items-center
                    justify-center
                    bg-black/20
                    ">
                      No Image
                    </div>

                  )}

                </div>

                <div className="
                p-5
                ">

                  <div className="
                  flex
                  justify-between
                  gap-3
                  ">

                    <div>

                      <h2 className="
                      text-xl
                      font-bold
                      ">
                        {
                          product.name
                        }
                      </h2>

                      <p className="
                      text-gray-400
                      text-sm
                      mt-1
                      ">
                        {
                          product.category
                        }
                      </p>

                    </div>

                    <div className="
                    text-right
                    ">

                      <p className="
                      text-accent
                      font-black
                      text-xl
                      ">
                        ৳
                        {
                          product.price
                        }
                      </p>

                    </div>

                  </div>

                  <div className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  ">

                    <span className="
                    text-sm
                    text-gray-400
                    ">
                      Stock:
                      {" "}
                      {
                        product.stock
                      }
                    </span>

                    {product.heroBanner && (

                      <span className="
                      px-3
                      py-1
                      rounded-full
                      bg-accent/10
                      text-accent
                      text-xs
                      ">
                        Hero Banner
                      </span>

                    )}

                  </div>

                  <div className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                  ">

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/edit-product/${product.id}`
                        )
                      }
                      className="
                      h-11
                      rounded-2xl
                      bg-blue-600
                      flex
                      items-center
                      justify-center
                      gap-2
                      font-semibold
                      "
                    >

                      <FiEdit />

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          product.id,
                          product.name
                        )
                      }
                      className="
                      h-11
                      rounded-2xl
                      bg-red-600
                      flex
                      items-center
                      justify-center
                      gap-2
                      font-semibold
                      "
                    >

                      <FiTrash2 />

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* DESKTOP TABLE */}

          <div className="
          hidden
          lg:block
          bg-secondary
          border
          border-accent/20
          rounded-3xl
          overflow-hidden
          shadow-xl
          mt-6
          ">

            <div className="
            overflow-x-auto
            ">

              <table className="
              w-full
              ">

                <thead>

                  <tr className="
                  bg-black/20
                  border-b
                  border-accent/20
                  ">

                    <th className="
                    p-5
                    text-left
                    ">
                      Image
                    </th>

                    <th className="
                    p-5
                    text-left
                    ">
                      Product
                    </th>

                    <th className="
                    p-5
                    text-left
                    ">
                      Category
                    </th>

                    <th className="
                    p-5
                    text-left
                    ">
                      Price
                    </th>

                    <th className="
                    p-5
                    text-left
                    ">
                      Stock
                    </th>

                    <th className="
                    p-5
                    text-center
                    ">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredProducts.map(
                    (product) => (

                    <tr
                      key={product.id}
                      className="
                      border-b
                      border-white/5
                      hover:bg-black/10
                      transition
                      "
                    >

                      <td className="
                      p-4
                      ">

                        {product.image ? (

                          <img
                            src={
                              product.image
                            }
                            alt={
                              product.name
                            }
                            className="
                            w-20
                            h-20
                            rounded-2xl
                            object-cover
                            "
                          />

                        ) : (

                          <div className="
                          w-20
                          h-20
                          rounded-2xl
                          bg-black/20
                          flex
                          items-center
                          justify-center
                          ">
                            N/A
                          </div>

                        )}

                      </td>

                      <td className="
                      p-4
                      ">

                        <div>

                          <h3 className="
                          font-bold
                          text-lg
                          ">
                            {
                              product.name
                            }
                          </h3>

                          {product.heroBanner && (

                            <span className="
                            text-xs
                            text-accent
                            ">
                              Hero Banner
                            </span>

                          )}

                        </div>

                      </td>

                      <td className="
                      p-4
                      text-gray-300
                      ">
                        {
                          product.category
                        }
                      </td>

                      <td className="
                      p-4
                      text-accent
                      font-bold
                      ">
                        ৳
                        {
                          product.price
                        }
                      </td>

                      <td className="
                      p-4
                      ">
                        {
                          product.stock
                        }
                      </td>

                      <td className="
                      p-4
                      ">

                        <div className="
                        flex
                        justify-center
                        gap-3
                        ">

                          <button
                            onClick={() =>
                              navigate(
                                `/admin/edit-product/${product.id}`
                              )
                            }
                            className="
                            px-4
                            py-2
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-700
                            flex
                            items-center
                            gap-2
                            "
                          >

                            <FiEdit />

                            Edit

                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                product.id,
                                product.name
                              )
                            }
                            className="
                            px-4
                            py-2
                            rounded-xl
                            bg-red-600
                            hover:bg-red-700
                            flex
                            items-center
                            gap-2
                            "
                          >

                            <FiTrash2 />

                            Delete

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </>

      )}

    </div>

  );

}