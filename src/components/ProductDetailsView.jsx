import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "./ui/Button";
import RelatedProducts from "./RelatedProducts";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import {
  getProductById,
} from "../services/firestoreProductService";

export default function ProductDetailsView() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const { addToWishlist } =
    useWishlist();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedImage,
    setSelectedImage] =
    useState("");

  const [zoom, setZoom] =
    useState(false);

  useEffect(() => {
    const loadProduct =
      async () => {
        const data =
          await getProductById(id);

        setProduct(data);

        if (
          data?.images?.length > 0
        ) {
          setSelectedImage(
            data.images[0]
          );
        } else {
          setSelectedImage(
            data.image
          );
        }

        setLoading(false);
      };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center text-lg">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 text-center text-red-600 text-2xl">
        Product Not Found
      </div>
    );
  }

  const galleryImages =
    product.images?.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

        {/* IMAGE SECTION */}

        <div>

          <div
            className="
              bg-white
              rounded-[28px]
              overflow-hidden
              shadow-premium
              relative
              cursor-zoom-in
            "
            onMouseEnter={() =>
              setZoom(true)
            }
            onMouseLeave={() =>
              setZoom(false)
            }
          >

            <img
              src={selectedImage}
              alt={product.name}
              className={`
                w-full
                object-cover
                transition-all
                duration-500
                ${
                  zoom
                    ? "scale-125"
                    : "scale-100"
                }
              `}
            />

            <div
              className="
                absolute
                bottom-4
                right-4
                bg-black/70
                text-white
                text-xs
                px-3
                py-2
                rounded-full
              "
            >
              Zoom
            </div>

          </div>

          {galleryImages.length > 1 && (

            <div className="flex gap-3 mt-5 flex-wrap">

              {galleryImages.map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    onClick={() =>
                      setSelectedImage(img)
                    }
                    className={`
                      w-20
                      h-20
                      md:w-24
                      md:h-24
                      object-cover
                      rounded-2xl
                      cursor-pointer
                      border-2
                      transition-all
                      duration-300
                      hover:scale-105
                      ${
                        selectedImage === img
                          ? "border-black shadow-lg"
                          : "border-gray-200"
                      }
                    `}
                  />
                )
              )}

            </div>

          )}

        </div>

        {/* PRODUCT INFO */}

        <div
          className="
          flex
          flex-col
          justify-center
          lg:sticky
          lg:top-28
          h-fit
        "
        >

          <span className="inline-flex w-fit px-4 py-2 rounded-full bg-gray-100 text-sm font-medium">
            Premium Collection
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-5 leading-tight">
            {product.name}
          </h1>

          <div className="mt-6">

            <span className="text-4xl font-bold text-primary">
              ৳ {product.price}
            </span>

          </div>

          <div className="mt-5">

            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                ✓ In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-red-600 font-semibold">
                Out Of Stock
              </span>
            )}

          </div>

          <p className="mt-8 text-gray-600 leading-8">
            {product.description}
          </p>

          {/* ACTION BUTTONS */}

          <div className="flex flex-wrap gap-4 mt-10">

            <Button
              onClick={() =>
                addToCart(product)
              }
            >
              Add To Cart
            </Button>

            <button
              onClick={() =>
                addToWishlist(product)
              }
              className="
                px-6
                py-3
                rounded-xl
                border
                border-gray-300
                hover:bg-gray-100
                transition
              "
            >
              Wishlist
            </button>

            <a
              href={`https://wa.me/8801406978619?text=I'm interested in ${product.name}`}
              target="_blank"
              rel="noreferrer"
              className="
                px-6
                py-3
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                font-medium
                transition
              "
            >
              WhatsApp Order
            </a>

          </div>

          {/* TRUST BADGES */}

          <div className="mt-10 space-y-4">

            <div
              className="
                flex
                items-center
                gap-3
                p-4
                rounded-2xl
                bg-green-50
                border
                border-green-100
              "
            >
              🚚 Free Delivery Available
            </div>

            <div
              className="
                flex
                items-center
                gap-3
                p-4
                rounded-2xl
                bg-blue-50
                border
                border-blue-100
              "
            >
              🔒 100% Secure Payment
            </div>

            <div
              className="
                flex
                items-center
                gap-3
                p-4
                rounded-2xl
                bg-yellow-50
                border
                border-yellow-100
              "
            >
              💎 Premium Quality Guaranteed
            </div>

          </div>

          {/* DELIVERY INFO */}

          <div className="mt-8">

            <div
              className="
              rounded-[24px]
              border
              border-gray-200
              overflow-hidden
              bg-white
            "
            >

              <div className="p-5 border-b">

                <h3 className="font-bold text-lg">
                  Delivery Information
                </h3>

              </div>

              <div className="p-5 space-y-4 text-gray-600">

                <div className="flex gap-3">
                  <span>🚚</span>
                  <span>
                    Inside Dhaka: 1–2 Days
                  </span>
                </div>

                <div className="flex gap-3">
                  <span>📦</span>
                  <span>
                    Outside Dhaka: 2–5 Days
                  </span>
                </div>

                <div className="flex gap-3">
                  <span>💵</span>
                  <span>
                    Cash On Delivery Available
                  </span>
                </div>

                <div className="flex gap-3">
                  <span>🔄</span>
                  <span>
                    7 Days Easy Return Policy
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <RelatedProducts
        currentId={product.id}
      />

    </div>
  );
}
