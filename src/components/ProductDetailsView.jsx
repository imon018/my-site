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

          <div className="bg-white rounded-[28px] overflow-hidden shadow-premium">

            <img
              src={selectedImage}
              alt={product.name}
              className="w-full object-cover transition duration-500 hover:scale-105"
            />

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
                    className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all ${
                      selectedImage === img
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  />
                )
              )}

            </div>

          )}

        </div>

        {/* PRODUCT INFO */}

        <div className="flex flex-col justify-center">

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
              className="outline-btn"
            >
              Wishlist
            </button>

          </div>

        </div>

      </div>

      {/* YOU MAY ALSO LIKE */}

      <RelatedProducts
        currentId={product.id}
      />

    </div>
  );
}
