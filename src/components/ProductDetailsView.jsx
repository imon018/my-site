import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "./ui/Button";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import { getProductById } from "../services/firestoreProductService";

export default function ProductDetailsView() {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState("");

  useEffect(() => {
    const loadProduct = async () => {
      const data =
        await getProductById(id);

      setProduct(data);

      if (data?.images?.length > 0) {
        setSelectedImage(data.images[0]);
      } else {
        setSelectedImage(data.image);
      }

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center">
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
    <section className="container-box py-12 lg:py-20">

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

        {/* LEFT */}

        <div>

          <div className="overflow-hidden rounded-[30px] bg-white shadow-premium">

            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[420px] md:h-[600px] object-cover hover:scale-105 transition duration-500"
            />

          </div>

          {galleryImages.length > 1 && (

            <div className="flex gap-3 mt-5 overflow-x-auto">

              {galleryImages.map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={product.name}
                    onClick={() =>
                      setSelectedImage(img)
                    }
                    className={`w-20 h-20 rounded-xl object-cover cursor-pointer border-2 transition ${
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

        {/* RIGHT */}

        <div>

          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-sm">

            {product.category}

          </span>

          <h1 className="mt-5 text-4xl lg:text-5xl font-bold">

            {product.name}

          </h1>

          <p className="mt-5 text-4xl font-bold text-black">

            ৳ {product.price}

          </p>

          <div className="mt-5">

            {product.stock > 0 ? (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            )}

          </div>

          <p className="mt-8 text-gray-600 leading-8">

            {product.description}

          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Button
              onClick={() =>
                addToCart(product)
              }
              className="flex-1"
            >
              Add To Cart
            </Button>

            <button
              onClick={() =>
                addToWishlist(product)
              }
              className="flex-1 border border-gray-300 rounded-xl px-6 py-3 font-medium hover:bg-gray-100"
            >
              Wishlist
            </button>

          </div>

          <a
            href={`https://wa.me/?text=I want to order ${product.name}`}
            target="_blank"
            rel="noreferrer"
            className="block mt-4"
          >
            <button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold">
              Order on WhatsApp
            </button>
          </a>

          {/* DELIVERY */}

          <div className="mt-10 space-y-4">

            <div className="premium-card p-5">

              <h4 className="font-semibold">
                🚚 Fast Delivery
              </h4>

              <p className="text-gray-500 mt-2 text-sm">
                Delivery across Bangladesh
                within 2-5 working days.
              </p>

            </div>

            <div className="premium-card p-5">

              <h4 className="font-semibold">
                🔄 Easy Return
              </h4>

              <p className="text-gray-500 mt-2 text-sm">
                Easy return policy for
                damaged or incorrect items.
              </p>

            </div>

            <div className="premium-card p-5">

              <h4 className="font-semibold">
                🔒 Secure Shopping
              </h4>

              <p className="text-gray-500 mt-2 text-sm">
                Safe payment and secure
                checkout experience.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
