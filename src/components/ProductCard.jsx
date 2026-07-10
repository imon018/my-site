import {
  useNavigate,
} from "react-router-dom";

import Button from "./ui/Button";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import {
  successToast,
} from "./ui/Toast";

import ProductRating from "./product/ProductRating";

export default function ProductCard({
  product,
  compact = false,
}) {

  const navigate =
    useNavigate();

  const {
    addToCart,
  } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const liked =
    isWishlisted(
      product.id
    );

  const handleAdd = () => {

    addToCart(product);

    successToast(
      "Added to cart successfully"
    );

  };

  return (

    <div
      className={`
        group
        bg-white
        overflow-hidden
        border
        border-amber-500/20
        transition-all
        duration-500

        ${
          compact
            ? `
              rounded-[22px]
              shadow-[0_0_15px_rgba(245,158,11,.12)]
              hover:-translate-y-1
            `
            : `
              rounded-[36px]
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-3
            `
        }
      `}
    >

      {/* IMAGE */}

      <div
        className="
          relative
          overflow-hidden
        "
      >

        <img
          src={
            product.image ||
            "https://via.placeholder.com/600"
          }
          alt={
            product.name
          }
          className={`
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-110

            ${
              compact
                ? "h-32 md:h-40"
                : "h-64 sm:h-72 md:h-80"
            }
          `}
        />

        {/* HEART */}

        <button
          onClick={() =>
            toggleWishlist(
              product
            )
          }
          className={`
            absolute
            top-3
            right-3
            rounded-full
            bg-white/95
            backdrop-blur
            shadow-xl
            flex
            items-center
            justify-center
            transition
            hover:scale-110

            ${
              compact
                ? `
                  w-8
                  h-8
                  text-sm
                `
                : `
                  w-12
                  h-12
                  text-2xl
                `
            }
          `}
        >

          {
            liked
              ? "❤️"
              : "🤍"
          }

        </button>

        {/* PREMIUM BADGE */}

        <div
          className={`
            absolute
            top-3
            left-3
            rounded-full
            bg-gradient-to-r
            from-yellow-400
            to-amber-500
            text-black
            font-black
            shadow-lg

            ${
              compact
                ? `
                  px-2
                  py-1
                  text-[9px]
                `
                : `
                  px-4
                  py-2
                  text-xs
                `
            }
          `}
        >

          ✨ Premium

        </div>

        {/* PRICE */}

        <div
          className={`
            absolute
            bottom-3
            right-3
            rounded-full
            bg-white/95
            shadow-xl
            font-black
            text-blue-900

            ${
              compact
                ? `
                  px-3
                  py-1.5
                  text-xs
                `
                : `
                  px-5
                  py-3
                `
            }
          `}
        >

          ৳ {product.price}

        </div>

      </div>

      {/* CONTENT */}

      <div
        className={
          compact
            ? "p-3"
            : "p-6"
        }
      >

        <h3
          className={`
            font-black
            text-slate-900
            line-clamp-1

            ${
              compact
                ? "text-sm"
                : "text-xl"
            }
          `}
        >

          {product.name}

        </h3>

        <ProductRating
          productId={
            product.id
          }
        />

        {!compact && (

          <p
            className="
              mt-4
              text-sm
              text-gray-500
              leading-6
              line-clamp-2
            "
          >

            {product.description}

          </p>

        )}

        <div
          className={
            compact
              ? "mt-2"
              : "mt-5"
          }
        >

          {
            product.stock > 0

              ? (

                <span
                  className={`
                    rounded-full
                    bg-green-50
                    text-green-700
                    font-bold
                    inline-flex

                    ${
                      compact
                        ? `
                          px-2
                          py-1
                          text-[10px]
                        `
                        : `
                          px-4
                          py-2
                          text-sm
                        `
                    }
                  `}
                >

                  ✓ In Stock

                </span>

              )

              : (

                <span
                  className={`
                    rounded-full
                    bg-red-50
                    text-red-600
                    font-bold
                    inline-flex

                    ${
                      compact
                        ? `
                          px-2
                          py-1
                          text-[10px]
                        `
                        : `
                          px-4
                          py-2
                          text-sm
                        `
                    }
                  `}
                >

                  Out Of Stock

                </span>

              )
          }

        </div>

        <div
          className={`
            grid
            grid-cols-2

            ${
              compact
                ? `
                  gap-2
                  mt-3
                `
                : `
                  gap-3
                  mt-7
                `
            }
          `}
        >

          <Button
            onClick={
              handleAdd
            }
            className={`
              rounded-2xl
              bg-gradient-to-r
              from-blue-900
              to-yellow-500
              font-bold
              text-white

              ${
                compact
                  ? "text-[10px]"
                  : ""
              }
            `}
          >

            🛒 Add Cart

          </Button>

          <Button
            onClick={() =>
              navigate(
                `/product/${product.id}`
              )
            }
            className={`
              rounded-2xl
              bg-slate-900
              hover:bg-black
              font-bold

              ${
                compact
                  ? "text-[10px]"
                  : ""
              }
            `}
          >

            👁 View

          </Button>

        </div>

      </div>

    </div>

  );

}
