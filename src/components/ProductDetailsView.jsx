import { useParams } from "react-router-dom";
import products from "../data/products";
import Button from "./ui/Button";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

export default function ProductDetailsView() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

      <img
        src={product.image}
        className="rounded-2xl shadow-lg"
      />

      <div>

        <h1 className="text-4xl font-bold">
          {product.name}
        </h1>

        <p className="text-2xl text-primary mt-4">
          ৳ {product.price}
        </p>

        <p className="mt-6 text-gray-600">
          Premium quality product available in Dream Mode store.
        </p>

        <div className="mt-8 flex gap-4">

          <Button onClick={() => addToCart(product)}>
            Add to Cart
          </Button>

          <button
            onClick={() => addToWishlist(product)}
            className="border px-6 py-3 rounded-xl"
          >
            Wishlist
          </button>

        </div>

      </div>

    </div>
  );
}
