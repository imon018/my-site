import {
  useEffect,
  useState,
} from "react";


import {
  Swiper,
  SwiperSlide,
} from "swiper/react";


import {
  Autoplay,
  Pagination,
} from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";


import {
  FaStar,
  FaUserCircle,
  FaQuoteLeft,
  FaCheckCircle,
} from "react-icons/fa";


import {
  getLatestReviewsWithUser,
  formatReviewDate,
} from "../services/reviewService";




export default function StatsSection(){


  const [
    reviews,
    setReviews,
  ] = useState([]);



  const [
    loading,
    setLoading,
  ] = useState(true);






  useEffect(()=>{


    async function loadReviews(){


      try{


        const data =
          await getLatestReviewsWithUser();



        setReviews(data);



      }catch(error){


        console.log(error);



      }finally{


        setLoading(false);


      }


    }



    loadReviews();



  },[]);






  return (

    <section className="
      py-14
      md:py-20
      bg-white
    ">


      <div className="container-box">



        {/* Heading */}


        <div className="
          text-center
          mb-10
        ">


          <h2
            className="
            text-2xl
            md:text-5xl
            font-black
            whitespace-nowrap
            text-blue-950
            "
          >

            What Our Customers Say

          </h2>




          <div
            className="
            w-full
            max-w-xs
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-yellow-500
            to-transparent
            mx-auto
            mt-4
            "
          />



        </div>







        {
          loading ?


          (

            <div className="
              text-center
              py-16
            ">

              Loading Reviews...

            </div>


          )



          : reviews.length===0 ?



          (

            <div className="
              text-center
              py-16
              border
              rounded-3xl
            ">

              No Reviews Yet

            </div>


          )



          :



          (

          <Swiper


            className="
              max-w-6xl
              mx-auto
            "


            modules={[
              Autoplay,
              Pagination,
            ]}



            autoplay={{
              delay:3500,
              disableOnInteraction:false,
            }}



            loop={
              reviews.length>3
            }



            pagination={{
              clickable:true,
            }}



            spaceBetween={24}



            breakpoints={{

              0:{
                slidesPerView:1.1,
              },

              640:{
                slidesPerView:2,
              },


              1024:{
                slidesPerView:3,
              },

            }}



          >




          {
            reviews.map(
              (review)=>(



              <SwiperSlide
                key={review.id}
              >



                <div className="
                  rounded-[32px]
                  border
                  border-slate-200
                  bg-white
                  p-7
                  shadow-lg
                ">



                  <FaQuoteLeft
                    className="
                    text-5xl
                    text-amber-100
                    ml-auto
                    "
                  />





                  <div className="
                    flex
                    items-center
                    gap-4
                  ">


                    {
                      review.photo ?


                      (

                      <img

                        src={
                          review.photo
                        }

                        alt={
                          review.name
                        }


                        className="
                        h-16
                        w-16
                        rounded-full
                        object-cover
                        border-2
                        border-amber-400
                        "

                      />


                      )


                      :


                      (

                      <FaUserCircle
                        className="
                        text-6xl
                        text-slate-300
                        "
                      />

                      )


                    }




                    <div>


                      <h3 className="
                        text-lg
                        font-bold
                      ">


                        {
                          review.name ||
                          "Dream Mode Customer"
                        }


                      </h3>



                      <div className="
                        flex
                        mt-2
                      ">


                      {
                        Array.from({
                          length:5
                        }).map(
                          (_,i)=>(

                          <FaStar

                            key={i}

                            className={
                              i <
                              (
                                review.rating ||
                                5
                              )

                              ?

                              "text-amber-500"

                              :

                              "text-gray-300"

                            }

                          />


                          )
                        )

                      }


                      </div>



                    </div>


                  </div>







                  <p className="
                    mt-6
                    text-gray-600
                    leading-7
                    min-h-[120px]
                  ">


                    {
                      review.comment
                      ?

                      `“${review.comment}”`

                      :

                      "Excellent quality product. Highly recommended."

                    }


                  </p>








                  <div className="
                    mt-6
                    flex
                    justify-between
                    items-center
                    border-t
                    pt-5
                  ">


                    <span className="
                      text-xs
                      text-gray-400
                    ">

                      {
                        formatReviewDate(
                          review.createdAt
                        )
                      }

                    </span>





                    <span className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      font-semibold
                      text-emerald-700
                    ">


                      <FaCheckCircle/>

                      Verified Purchase


                    </span>



                  </div>



                </div>


              </SwiperSlide>


              )
            )
          }




          </Swiper>


          )

        }





      </div>


    </section>


  );

}
