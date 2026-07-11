import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiShoppingBag,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiShield,
} from "react-icons/fi";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import useAuth from "../hooks/useAuth";


export default function MobileBottomNav() {

  const location = useLocation();

  const navigate = useNavigate();


  const {
    cartCount,
  } = useCart();


  const {
    wishlist,
  } = useWishlist();


  const {
    user,
  } = useAuth();



  const wishlistCount =
    wishlist?.length || 0;



  const isActive = (path) =>
    location.pathname === path;



  const accountClick = () => {


    if(!user){

      navigate("/login");

      return;

    }



    if(user.role === "admin"){

      navigate("/admin");

      return;

    }



    navigate("/profile");


  };




  const itemClass = (active)=>`

    flex
    flex-col
    items-center
    justify-center

    gap-1

    transition-all
    duration-300

    ${
      active
      ?
      "text-[#D4AF37]"
      :
      "text-slate-500"
    }

  `;



  return (

    <div
      className="
      md:hidden

      fixed
      bottom-0
      left-0
      right-0

      z-[999]

      px-3
      pb-3
      "
    >


      <div

        className="
        grid
        grid-cols-5

        h-20

        rounded-[28px]

        bg-white/85

        backdrop-blur-xl

        border
        border-slate-200

        shadow-[0_-10px_40px_rgba(0,0,0,.10)]
        "

      >


        {/* HOME */}

        <Link

          to="/"

          className={itemClass(
            isActive("/")
          )}

        >

          <FiHome size={22}/>

          <span className="text-[11px] font-medium">
            Home
          </span>


        </Link>




        {/* SHOP */}

        <Link

          to="/shop"

          className={itemClass(
            isActive("/shop")
          )}

        >

          <FiShoppingBag size={22}/>


          <span className="text-[11px] font-medium">
            Shop
          </span>


        </Link>





        {/* CART */}

        <Link

          to="/cart"

          className={`
          relative
          ${itemClass(
            isActive("/cart")
          )}
          `}

        >

          <FiShoppingCart size={22}/>


          {
            cartCount > 0 && (

              <span

                className="
                absolute

                top-2
                right-5

                bg-[#D4AF37]

                text-white

                text-[10px]

                w-5
                h-5

                rounded-full

                flex
                items-center
                justify-center

                font-bold
                "

              >

                {cartCount}

              </span>

            )
          }


          <span className="text-[11px] font-medium">
            Cart
          </span>


        </Link>






        {/* WISHLIST */}

        <Link

          to="/wishlist"

          className={`
          relative

          ${itemClass(
            isActive("/wishlist")
          )}

          `}

        >

          <FiHeart size={22}/>


          {
            wishlistCount > 0 && (

              <span

              className="
              absolute

              top-2
              right-5

              bg-[#D4AF37]

              text-white

              text-[10px]

              w-5
              h-5

              rounded-full

              flex
              items-center
              justify-center

              font-bold
              "

              >

                {wishlistCount}

              </span>

            )
          }


          <span className="text-[11px] font-medium">
            Wishlist
          </span>


        </Link>






        {/* ACCOUNT */}

        <button

          onClick={accountClick}

          className={itemClass(
            location.pathname.startsWith("/profile")
            ||
            location.pathname.startsWith("/admin")
          )}

        >


          {
            user?.role === "admin"

            ?

            <FiShield size={22}/>

            :

            <FiUser size={22}/>

          }



          <span className="text-[11px] font-medium">


            {
              !user

              ?

              "Account"

              :

              user.role === "admin"

              ?

              "Admin"

              :

              "Profile"

            }


          </span>


        </button>



      </div>


    </div>

  );

}
