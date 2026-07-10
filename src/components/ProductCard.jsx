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






  const handleAdd = ()=>{


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
        rounded-[36px]
        overflow-hidden
        border
        border-yellow-100
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-3
        transition-all
        duration-500
      "
    >





      {/* IMAGE */}


      <div className="
        relative
        overflow-hidden
      ">



        <img

          src={
            product.image ||
            "https://via.placeholder.com/600"
          }

          alt={
            product.name
          }


          className="
            h-64
            sm:h-72
            md:h-80
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-110
          "

        />






        {/* HEART BUTTON */}



        <button

          onClick={()=>
            toggleWishlist(
              product
            )
          }


          className="
            absolute
            top-4
            right-4
            w-12
            h-12
            rounded-full
            bg-white/95
            backdrop-blur
            shadow-xl
            flex
            items-center
            justify-center
            text-2xl
            hover:scale-110
            transition
          "

        >

          {
            liked
            ?
            "❤️"
            :
            "🤍"
          }


        </button>









        {/* PREMIUM BADGE */}



        <div

          className="
            absolute
            top-4
            left-4
            px-4
            py-2
            rounded-full
            bg-gradient-to-r
            from-yellow-400
            to-amber-500
            text-black
            text-xs
            font-black
            shadow-lg
          "

        >

          ✨ Premium

        </div>








        {/* PRICE */}



        <div

          className="
            absolute
            bottom-4
            right-4
            px-5
            py-3
            rounded-full
            bg-white/95
            shadow-xl
            font-black
            text-blue-900
          "

        >

          ৳ {product.price}

        </div>




      </div>









      {/* CONTENT */}



      <div className="
        p-6
      ">



        <h3

          className="
            text-xl
            font-black
            text-slate-900
            line-clamp-1
          "

        >

          {product.name}

        </h3>






        <ProductRating

          productId={
            product.id
          }

        />








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








        {/* STOCK */}



        <div className="
          mt-5
        ">


          {
            product.stock > 0

            ?

            <span

              className="
                px-4
                py-2
                rounded-full
                bg-green-50
                text-green-700
                text-sm
                font-bold
                inline-flex
              "

            >

              ✓ In Stock

            </span>


            :

            <span

              className="
                px-4
                py-2
                rounded-full
                bg-red-50
                text-red-600
                text-sm
                font-bold
                inline-flex
              "

            >

              Out Of Stock

            </span>

          }


        </div>









        {/* BUTTONS */}



        <div className="
          grid
          grid-cols-2
          gap-3
          mt-7
        ">




          <Button

            onClick={
              handleAdd
            }


            className="
              rounded-2xl
              bg-gradient-to-r
              from-blue-900
              to-yellow-500
              font-bold
              text-white
            "

          >

            🛒 Add Cart

          </Button>







          <Button

            onClick={()=>

              navigate(
                `/product/${product.id}`
              )

            }


            className="
              rounded-2xl
              bg-slate-900
              hover:bg-black
              font-bold
            "

          >

            👁 View

          </Button>





        </div>






      </div>





    </div>

  );


}
