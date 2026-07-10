import useWishlist from "../hooks/useWishlist";

import useCart from "../hooks/useCart";

import Button from "./ui/Button";

import ProductRating from "./product/ProductRating";

import {
  successToast,
} from "./ui/Toast";



export default function WishlistPage() {


  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();



  const {
    addToCart,
  } = useCart();







  const handleCart = (product)=>{


    addToCart(product);


    successToast(
      "Added to cart successfully"
    );


  };







  return (


    <div

      className="
        min-h-screen
        bg-gradient-to-br
        from-gray-50
        via-white
        to-blue-50
        px-4
        md:px-8
        py-12
      "

    >



      <div className="
        max-w-7xl
        mx-auto
      ">





        {/* HEADER */}



        <div className="
          text-center
          mb-12
        ">


          <div className="
            inline-flex
            px-5
            py-2
            rounded-full
            bg-yellow-100
            text-yellow-800
            font-bold
          ">

            ❤️ Saved Collection

          </div>




          <h1

            className="
              mt-5
              text-4xl
              md:text-6xl
              font-black
              bg-gradient-to-r
              from-blue-900
              to-yellow-500
              bg-clip-text
              text-transparent
            "

          >

            My Wishlist

          </h1>




          <p className="
            mt-3
            text-gray-500
          ">

            Your favourite premium products

          </p>



        </div>









        {/* EMPTY STATE */}



        {
          wishlist.length === 0


          ?


          <div

            className="
              bg-white
              rounded-[40px]
              shadow-xl
              border
              border-yellow-100
              p-10
              md:p-16
              text-center
            "

          >


            <div className="
              text-7xl
            ">

              💔

            </div>



            <h2 className="
              mt-6
              text-3xl
              font-black
              text-blue-900
            ">

              Wishlist is Empty

            </h2>




            <p className="
              mt-3
              text-gray-500
            ">

              Add your favourite products and save them here.

            </p>




          </div>





          :





          <div

            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
            "

          >




            {
              wishlist.map(
                (item)=>(


                <div

                  key={
                    item.firestoreId
                  }


                  className="
                    group
                    bg-white
                    rounded-[36px]
                    overflow-hidden
                    border
                    border-yellow-100
                    shadow-lg
                    hover:shadow-2xl
                    hover:-translate-y-2
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
                        item.product.image
                      }


                      alt={
                        item.product.name
                      }


                      className="
                        w-full
                        h-72
                        object-cover
                        group-hover:scale-110
                        transition
                        duration-700
                      "

                    />





                    <div className="
                      absolute
                      top-4
                      right-4
                      bg-white
                      rounded-full
                      w-12
                      h-12
                      flex
                      items-center
                      justify-center
                      shadow-xl
                      text-xl
                    ">

                      ❤️

                    </div>




                  </div>









                  {/* CONTENT */}



                  <div className="
                    p-6
                  ">




                    <h3 className="
                      text-xl
                      font-black
                      text-blue-900
                      line-clamp-1
                    ">

                      {
                        item.product.name
                      }

                    </h3>





                    <ProductRating

                      productId={
                        item.product.id
                      }

                    />







                    <p className="
                      mt-4
                      text-2xl
                      font-black
                      text-yellow-600
                    ">

                      ৳ {
                        item.product.price
                      }

                    </p>









                    <div className="
                      grid
                      grid-cols-2
                      gap-3
                      mt-6
                    ">




                      <Button

                        onClick={()=>
                          handleCart(
                            item.product
                          )
                        }


                        className="
                          rounded-2xl
                          bg-gradient-to-r
                          from-blue-900
                          to-yellow-500
                          text-white
                          font-bold
                        "

                      >

                        🛒 Cart

                      </Button>







                      <Button

                        onClick={()=>

                          removeFromWishlist(
                            item.product.id
                          )

                        }


                        className="
                          rounded-2xl
                          bg-red-600
                          text-white
                          font-bold
                        "

                      >

                        Remove

                      </Button>





                    </div>




                  </div>





                </div>



              ))
            }




          </div>



        }





      </div>



    </div>


  );


}
