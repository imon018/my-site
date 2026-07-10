import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";


import {
  Swiper,
  SwiperSlide,
} from "swiper/react";


import {
  Pagination,
} from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";


import ProductCard from "./ProductCard";


import {
  getLatestProducts,
} from "../services/firestoreProductService";



export default function FeaturedProducts() {


  const navigate =
    useNavigate();



  const [
    products,
    setProducts
  ] = useState([]);



  const [
    loading,
    setLoading
  ] = useState(true);




  useEffect(() => {

    loadProducts();

  }, []);




  const loadProducts =
    async () => {

      try {

        const data =
          await getLatestProducts();


        setProducts(
          data.slice(0,8)
        );


      }
      catch(error){

        console.log(error);

      }
      finally{

        setLoading(false);

      }

    };





  const slides = [];



  for(
    let i = 0;
    i < products.length;
    i += 4
  ){

    slides.push(
      products.slice(
        i,
        i + 4
      )
    );

  }





  return (

    <section
      className="
        py-8
        md:py-12
      "
    >


      <div
        className="
          container-box
        "
      >



        {/* HEADER */}


        <div
          className="
            text-center
            mb-8
          "
        >


          <div
            className="
              inline-flex
              px-4
              py-1.5

              rounded-full

              border
              border-amber-500

              bg-transparent

              shadow-[0_0_20px_rgba(245,158,11,.35)]

              text-amber-500

              text-xs

              font-bold
            "
          >

            ✨ New Arrival

          </div>



          <h2
            className="
              mt-4

              text-2xl
              md:text-4xl

              font-black

              text-slate-900
            "
          >

            Featured Products

          </h2>



          <p
            className="
              mt-2

              text-sm
              md:text-base

              text-gray-500
            "
          >

            Discover our latest premium collection

          </p>



        </div>





        {
          loading

          ?

          (

            <div
              className="
                text-center
                py-10
              "
            >

              Loading...

            </div>

          )


          :


          (

          <Swiper

            modules={[
              Pagination
            ]}


            pagination={{
              clickable:true
            }}


            spaceBetween={20}


            className="
              pb-10
            "

          >



            {
              slides.map(
                (
                  slide,
                  index
                ) => (


                <SwiperSlide
                  key={index}
                >



                  <div
                    className="
                      grid

                      grid-cols-2

                      gap-3

                      md:grid-cols-4

                      md:gap-5
                    "
                  >



                    {
                      slide.map(
                        (
                          product
                        ) => (


                        <ProductCard

                          key={
                            product.id
                          }

                          product={
                            product
                          }

                          compact

                        />


                      ))
                    }



                  </div>



                </SwiperSlide>


              ))

            }





            {/* VIEW ALL SLIDE */}


            <SwiperSlide>


              <div
                className="
                  min-h-[320px]

                  flex

                  items-center

                  justify-center
                "
              >



                <button

                  onClick={() =>
                    navigate(
                      "/shop"
                    )
                  }


                  className="
                    w-full

                    max-w-sm

                    h-44

                    rounded-[28px]

                    border

                    border-amber-500

                    bg-gradient-to-br

                    from-[#021B4A]

                    via-[#03235F]

                    to-[#021B4A]


                    shadow-[0_0_20px_rgba(245,158,11,.45)]

                    backdrop-blur-md

                    transition

                    hover:scale-105
                  "

                >


                  <h3
                    className="
                      text-2xl

                      font-black

                      text-amber-400
                    "
                  >

                    View All ➡

                  </h3>



                  <p
                    className="
                      mt-2

                      text-white/80

                      text-sm
                    "
                  >

                    Explore complete collection

                  </p>


                </button>



              </div>


            </SwiperSlide>




          </Swiper>

          )

        }



      </div>


    </section>

  );

}
