import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";

import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";

import {
  getProductsFromDB,
} from "../../services/firestoreProductService";

import {
  createLandingPage,
} from "../../services/landingPageService";

export default function CreateLandingPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("");

  const [title, setTitle] = useState("");

  const [slug, setSlug] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [offerPrice, setOfferPrice] = useState("");

  const [heroImage, setHeroImage] = useState("");

  const [gallery, setGallery] = useState([]);

  const [deliveryCharge, setDeliveryCharge] = useState(80);

  const [cashOnDelivery, setCashOnDelivery] =
    useState(true);

  const [status, setStatus] =
    useState("draft");

  useEffect(() => {

    loadProducts();

  }, []);

  async function loadProducts() {

    try {

      const data =
        await getProductsFromDB();

      setProducts(data);

    }

    catch (error) {

      console.log(error);

      errorToast("Failed to load products.");

    }

  }

  function handleProductSelect(id) {

    setSelectedProduct(id);

    const product = products.find(
      item => item.id === id
    );

    if (!product) return;

    setTitle(product.name || "");

    setSlug(

      (product.name || "")

        .toLowerCase()

        .replace(/\s+/g, "-")

        .replace(/[^a-z0-9-]/g, "")

    );

    setDescription(
      product.description || ""
    );

    setPrice(product.price || "");

    setOfferPrice(product.price || "");

    setHeroImage(product.image || "");

    setGallery(product.images || []);

  }



  async function handleSubmit(e) {

    e.preventDefault();

    if (

      !selectedProduct ||

      !title ||

      !slug ||

      !description ||

      !heroImage

    ) {

      errorToast(

        "Please fill all required fields."

      );

      return;

    }

    const landingData = {

      productId: selectedProduct,

      title,

      slug,

      description,

      price: Number(price),

      offerPrice: Number(offerPrice),

      heroImage,

      gallery,

      deliveryCharge: Number(deliveryCharge),

      cashOnDelivery,

      status,

      views: 0,

      orders: 0,

      revenue: 0,

      createdAt: new Date(),

    };

    try {

      setLoading(true);

      await createLandingPage(

        landingData

      );

      successToast(

        "Landing Page Created Successfully."

      );

      navigate(

        "/admin/landing"

      );

    }

    catch (error) {

      console.log(error);

      errorToast(

        error.message ||

        "Failed to create landing page."

      );

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <div
      className="
      min-h-screen
      bg-[#FAF7F2]
      p-4
      lg:p-8
      "
    >

      <div
        className="
        max-w-5xl
        mx-auto
        "
      >

        <div className="mb-6">

          <h1
            className="
            text-3xl
            font-black
            text-slate-900
            "
          >

            Create Landing Page

          </h1>

          <p
            className="
            text-gray-500
            mt-1
            "
          >

            Facebook Single Product Landing Builder

          </p>

        </div>

        <form

          onSubmit={handleSubmit}

          className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-6
          space-y-6
          "
        >


                    {/* PRODUCT */}

          <div>

            <label
              className="
              block
              font-bold
              mb-2
              "
            >

              Select Product

            </label>

            <select

              value={selectedProduct}

              onChange={(e)=>

                handleProductSelect(
                  e.target.value
                )

              }

              className="
              w-full
              h-12
              rounded-xl
              border
              border-gray-200
              px-4
              outline-none
              "

            >

              <option value="">

                Choose Product

              </option>

              {

                products.map(product=>(

                  <option

                    key={product.id}

                    value={product.id}

                  >

                    {product.name}

                  </option>

                ))

              }

            </select>

          </div>

          {/* TITLE */}

          <div>

            <label
              className="
              block
              font-bold
              mb-2
              "
            >

              Landing Title

            </label>

            <input

              value={title}

              onChange={(e)=>

                setTitle(
                  e.target.value
                )

              }

              className="
              w-full
              h-12
              rounded-xl
              border
              border-gray-200
              px-4
              "

            />

          </div>

          {/* SLUG */}

          <div>

            <label
              className="
              block
              font-bold
              mb-2
              "
            >

              Landing URL

            </label>

            <input

              value={slug}

              onChange={(e)=>

                setSlug(
                  e.target.value
                )

              }

              className="
              w-full
              h-12
              rounded-xl
              border
              border-gray-200
              px-4
              "

            />

            <p
              className="
              text-xs
              text-gray-500
              mt-2
              "
            >

              /landing/{slug}

            </p>

          </div>

          {/* PRICE */}

          <div
            className="
            grid
            md:grid-cols-2
            gap-4
            "
          >

            <div>

              <label
                className="
                block
                font-bold
                mb-2
                "
              >

                Regular Price

              </label>

              <input

                type="number"

                value={price}

                onChange={(e)=>

                  setPrice(
                    e.target.value
                  )

                }

                className="
                w-full
                h-12
                rounded-xl
                border
                border-gray-200
                px-4
                "

              />

            </div>

            <div>

              <label
                className="
                block
                font-bold
                mb-2
                "
              >

                Offer Price

              </label>

              <input

                type="number"

                value={offerPrice}

                onChange={(e)=>

                  setOfferPrice(
                    e.target.value
                  )

                }

                className="
                w-full
                h-12
                rounded-xl
                border
                border-gray-200
                px-4
                "

              />

            </div>

          </div>

          {/* DESCRIPTION */}

          <div>

            <label
              className="
              block
              font-bold
              mb-2
              "
            >

              Description

            </label>

            <textarea

              rows={6}

              value={description}

              onChange={(e)=>

                setDescription(
                  e.target.value
                )

              }

              className="
              w-full
              rounded-xl
              border
              border-gray-200
              p-4
              resize-none
              "

            />

          </div>



                    {/* HERO IMAGE */}

          <div>

            <label
              className="
              block
              font-bold
              mb-3
              "
            >

              Hero Image

            </label>

            {

              heroImage ? (

                <img

                  src={heroImage}

                  alt={title}

                  className="
                  w-full
                  h-72
                  rounded-xl
                  object-cover
                  border
                  "

                />

              ) : (

                <div
                  className="
                  h-72
                  rounded-xl
                  border-2
                  border-dashed
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  "
                >

                  No Hero Image

                </div>

              )

            }

          </div>

          {/* GALLERY */}

          <div>

            <label
              className="
              block
              font-bold
              mb-3
              "
            >

              Gallery Preview

            </label>

            {

              gallery.length > 0 ? (

                <div
                  className="
                  grid
                  grid-cols-2
                  md:grid-cols-4
                  gap-4
                  "
                >

                  {

                    gallery.map(

                      (image,index)=>(

                        <img

                          key={index}

                          src={image}

                          alt=""

                          className="
                          w-full
                          h-32
                          rounded-xl
                          object-cover
                          border
                          "

                        />

                      )

                    )

                  }

                </div>

              ) : (

                <div
                  className="
                  h-32
                  rounded-xl
                  border-2
                  border-dashed
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  "
                >

                  No Gallery Images

                </div>

              )

            }

          </div>

          {/* DELIVERY */}

          <div
            className="
            grid
            md:grid-cols-2
            gap-4
            "
          >

            <div>

              <label
                className="
                block
                font-bold
                mb-2
                "
              >

                Delivery Charge

              </label>

              <input

                type="number"

                value={deliveryCharge}

                onChange={(e)=>

                  setDeliveryCharge(
                    e.target.value
                  )

                }

                className="
                w-full
                h-12
                rounded-xl
                border
                border-gray-200
                px-4
                "

              />

            </div>

            <div
              className="
              bg-amber-50
              border
              border-amber-200
              rounded-xl
              px-4
              py-4
              flex
              items-center
              justify-between
              "
            >

              <div>

                <h3
                  className="
                  font-bold
                  "
                >

                  Cash On Delivery

                </h3>

                <p
                  className="
                  text-xs
                  text-gray-500
                  "
                >

                  Enable COD

                </p>

              </div>

              <input

                type="checkbox"

                checked={cashOnDelivery}

                onChange={(e)=>

                  setCashOnDelivery(
                    e.target.checked
                  )

                }

                className="
                w-5
                h-5
                "

              />

            </div>

          </div>

          {/* STATUS */}

          <div>

            <label
              className="
              block
              font-bold
              mb-2
              "
            >

              Landing Status

            </label>

            <select

              value={status}

              onChange={(e)=>

                setStatus(
                  e.target.value
                )

              }

              className="
              w-full
              h-12
              rounded-xl
              border
              border-gray-200
              px-4
              outline-none
              "

            >

              <option value="draft">

                Draft

              </option>

              <option value="published">

                Published

              </option>

            </select>

          </div>



                    {/* ACTION BUTTONS */}

          <div
            className="
            flex
            flex-col
            md:flex-row
            gap-3
            pt-2
            "
          >

            <Button

              type="submit"

              disabled={loading}

              className="
              flex-1
              h-12
              rounded-xl
              bg-gradient-to-r
              from-amber-400
              to-amber-500
              text-white
              font-black
              "

            >

              {

                loading

                  ? "Creating Landing..."

                  : "Create Landing Page"

              }

            </Button>

            <Button

              type="button"

              onClick={()=>

                navigate("/admin/landing")

              }

              className="
              flex-1
              h-12
              rounded-xl
              bg-gray-200
              text-slate-700
              font-black
              "

            >

              Cancel

            </Button>

          </div>

        </form>

      </div>

    </div>

  );

}
