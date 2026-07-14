import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "./ui/Button";
import RelatedProducts from "./RelatedProducts";
import ProductReviews from "./product/ProductReviews";

import { useSettings } from "../context/SettingsContext";

import useCart from "../hooks/useCart";

import { getProductById } from "../services/firestoreProductService";

export default function ProductDetailsView() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const { settings } = useSettings();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");

  const [zoom, setZoom] = useState(false);

  useEffect(() => {

    const loadProduct = async () => {

      try {

        const data = await getProductById(id);

        setProduct(data);

        if (data?.images?.length) {

          setSelectedImage(data.images[0]);

        } else {

          setSelectedImage(data.image);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadProduct();

  }, [id]);



  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#FAF7F2]
        "
      >

        <div className="text-center">

          <div
            className="
              w-12
              h-12
              mx-auto
              border-4
              border-amber-500
              border-t-transparent
              rounded-full
              animate-spin
            "
          />

          <p
            className="
              mt-4
              text-[#172033]
              font-semibold
            "
          >
            Loading Product...
          </p>

        </div>

      </div>

    );

  }



  if (!product) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#FAF7F2]
        "
      >

        <div
          className="
            bg-white
            rounded-xl
            border
            border-red-100
            px-8
            py-10
            text-center
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-red-600
            "
          >
            Product Not Found
          </h2>

        </div>

      </div>

    );

  }



  const galleryImages =
    product.images?.length
      ? product.images
      : [product.image];



  return (

    <div
      className="
        min-h-screen
        bg-[#FAF7F2]
        py-6
        md:py-10
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          md:px-6
        "
      >

        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
            items-start
          "
        >

          {/* IMAGE SECTION */}

          <div>

            <div
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              className="
                bg-white
                rounded-xl
                border
                border-amber-500/20
                shadow-sm
                overflow-hidden
                p-4
              "
            >

              <img
                src={selectedImage}
                alt={product.name}
                className={`
                  w-full
                  h-[360px]
                  md:h-[520px]
                  object-contain
                  transition-all
                  duration-500
                  ${
                    zoom
                      ? "scale-105"
                      : "scale-100"
                  }
                `}
              />

            </div>

            {galleryImages.length > 1 && (

              <div
                className="
                  flex
                  gap-3
                  mt-4
                  flex-wrap
                "
              >

                                {galleryImages.map((img, index) => (

                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`
                      w-20
                      h-20
                      rounded-xl
                      overflow-hidden
                      border
                      transition-all

                      ${
                        selectedImage === img
                          ? "border-amber-500"
                          : "border-gray-200"
                      }
                    `}
                  >

                    <img
                      src={img}
                      alt=""
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  </button>

                ))}

              </div>

            )}

          </div>





          {/* PRODUCT INFO */}

          <div>

            <span
              className="
                inline-flex
                items-center
                rounded-xl
                bg-amber-100
                text-amber-700
                text-xs
                font-semibold
                px-3
                py-2
              "
            >
              💎 Premium Collection
            </span>





            <h1
              className="
                mt-4
                text-3xl
                md:text-5xl
                font-black
                text-[#172033]
                leading-tight
              "
            >
              {product.name}
            </h1>





            <div
              className="
                mt-5
                bg-white
                rounded-xl
                border
                border-amber-500/20
                p-5
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >

                <div>

                  <p className="text-xs text-gray-500">
                    Price
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-black
                      text-amber-600
                    "
                  >
                    ৳ {product.price}
                  </h2>

                </div>

                <span
                  className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-2
                    rounded-xl
                    text-xs
                    font-semibold
                  "
                >
                  {product.stock > 0
                    ? `✓ Stock (${product.stock})`
                    : "Out Of Stock"}
                </span>

              </div>

            </div>





            <div
              className="
                mt-5
                bg-white
                rounded-xl
                border
                border-gray-200
                p-5
              "
            >

              <h3
                className="
                  font-bold
                  text-[#172033]
                  mb-3
                "
              >
                Description
              </h3>

              <p
                className="
                  text-gray-600
                  leading-7
                  whitespace-pre-line
                "
              >
                {product.description}
              </p>

            </div>





            {/* ACTION BUTTONS */}

            <div
              className="
                grid
                grid-cols-2
                gap-3
                mt-6
              "
            >

              <Button
                onClick={() => addToCart(product)}
                className="
                  h-12
                  rounded-xl
                  bg-black
                  border
                  border-amber-500
                  text-white
                "
              >
                🛒 Add To Cart
              </Button>

              <a
                href={`https://wa.me/${settings.whatsapp?.replace(/\D/g,"")}?text=I'm interested in ${product.name}`}
                target="_blank"
                rel="noreferrer"
                className="
                  h-12
                  rounded-xl
                  bg-green-600
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                "
              >
                WhatsApp Order
              </a>

            </div>





            {/* PREMIUM FEATURES */}

            <div
              className="
                mt-6
                space-y-3
              "
            >

              <div
                className="
                  bg-white
                  rounded-xl
                  border
                  border-gray-200
                  p-4
                "
              >
                🚚 Fast & Secure Delivery
              </div>

              <div
                className="
                  bg-white
                  rounded-xl
                  border
                  border-gray-200
                  p-4
                "
              >
                🔒 Secure Payment
              </div>

              <div
                className="
                  bg-white
                  rounded-xl
                  border
                  border-gray-200
                  p-4
                "
              >
                💎 Premium Quality Guarantee
              </div>

            </div>

          </div>

        </div>

              {/* REVIEWS */}

      <div className="mt-10">

        <ProductReviews
          productId={product.id}
        />

      </div>



      {/* RELATED PRODUCTS */}

      <div className="mt-12">

        <div className="mb-5">

          <h2
            className="
              text-2xl
              font-black
              text-[#172033]
            "
          >
            Related Products
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            You may also like these products.
          </p>

        </div>

        <RelatedProducts
          currentId={product.id}
        />

      </div>

    </div>

  </div>

);
}
