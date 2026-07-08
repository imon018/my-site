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
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductById(id);

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
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-600 text-2xl">
        Product Not Found
      </div>
    );
  }

  const galleryImages =
    product.images?.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

      <div>
        <img
          src={selectedImage}
          alt={product.name}
          className="rounded-2xl shadow-lg w-full"
        />

        {galleryImages.length > 1 && (
          <div className="flex gap-3 mt-4 flex-wrap">
            {galleryImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name}-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-4xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {product.category}
        </p>

        <p className="text-3xl text-primary font-bold mt-4">
          ৳ {product.price}
        </p>

        <p className="mt-6 text-gray-700 leading-7">
          {product.description}
        </p>

        <p
          className={`mt-6 font-semibold ${
            product.stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `In Stock (${product.stock})`
            : "Out of Stock"}
        </p>

        <div className="flex gap-4 mt-8">
          <Button onClick={() => addToCart(product)}>
            Add to Cart
          </Button>

          <button
            onClick={() => addToWishlist(product)}
            className="border rounded-xl px-6 py-3 hover:bg-gray-100"
          >
            Wishlist
          </button>
        </div>
      </div>

    </div>
  );
}
