import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import useCart from "../hooks/useCart";
import { successToast } from "./ui/Toast";

export default function ProductCard({
  product,
}) {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);

    successToast(
      "Added to cart successfully"
    );
  };

  return (
    <div
      className="
      group
      bg-white
      rounded-[32px]
      overflow-hidden
      border
      border-slate-100
      shadow-sm
      hover:shadow-2xl
      hover:-translate-y-3
      transition-all
      duration-500
    "
    >
      {/* IMAGE */}

      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="
            h-60
            sm:h-72
            md:h-80
            lg:h-[380px]
            w-full
            object-cover
            transition-all
            duration-700
            group-hover:scale-110
          "
        />

        {/* Premium Badge */}

        <div
          className="
          absolute
          top-4
          left-4
          bg-gradient-to-r
          from-yellow-400
          to-amber-500
          text-black
          text-xs
          font-semibold
          px-4
          py-2
          rounded-full
          shadow-lg
        "
        >
          ✨ Premium
        </div>

        {/* Price */}

        <div
          className="
          absolute
          bottom-4
          right-4
          bg-white/90
          backdrop-blur-md
          px-4
          py-2
          rounded-full
          shadow-lg
          font-bold
          text-slate-900
        "
        >
          ৳ {product.price}
        </div>

      </div>

      {/* CONTENT */}

      <div className="p-6">

        <h3
          className="
          text-lg
          md:text-xl
          font-bold
          line-clamp-1
        "
        >
          {product.name}
        </h3>

        <p
          className="
          mt-3
          text-gray-500
          text-sm
          leading-6
          line-clamp-2
        "
        >
          {product.description}
        </p>

        {/* Stock */}

        <div className="mt-4">

          {product.stock > 0 ? (
            <span className="text-green-600 text-sm font-medium">
              ✓ In Stock
            </span>
          ) : (
            <span className="text-red-500 text-sm font-medium">
              Out Of Stock
            </span>
          )}

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3 mt-6">

          <Button
            onClick={handleAdd}
            className="
            rounded-2xl
          "
          >
            Add Cart
          </Button>

          <Button
            onClick={() =>
              navigate(
                `/product/${product.id}`
              )
            }
            className="
              bg-slate-900
              hover:bg-black
              rounded-2xl
            "
          >
            View
          </Button>

        </div>

      </div>

    </div>
  );
}
