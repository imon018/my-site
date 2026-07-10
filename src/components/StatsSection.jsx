import { useEffect, useState } from "react";

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
} from "react-icons/fa";

import {
  getLatestReviews,
  formatReviewDate,
} from "../services/reviewService";

export default function StatsSection() {

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadReviews() {

      try {

        const data =
          await getLatestReviews();

        setReviews(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadReviews();

  }, []);


  return (

    <section className="py-12 md:py-16 bg-white">

      <div className="container-box">


        {/* Heading */}

        <div className="text-center mb-8">

          <h2
            className="
            text-3xl
            md:text-5xl
            font-bold
            "
          >
            What Our Customers Say
          </h2>


          <div
            className="
            w-24
            h-1
            bg-amber-500
            rounded-full
            mx-auto
            mt-4
            "
          />

        </div>



        {loading ? (

          <div className="text-center py-16">

            <p className="text-gray-500">

              Loading Reviews...

            </p>

          </div>

        ) : (

          <Swiper

            modules={[
              Autoplay,
              Pagination,
            ]}

            spaceBetween={20}

            loop={reviews.length > 3}

            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}

            pagination={{
              clickable: true,
            }}

            breakpoints={{

              0: {

                slidesPerView: 1.15,

              },

              640: {

                slidesPerView: 2,

              },

              1024: {

                slidesPerView: 3,

              },

            }}

          >

                        {reviews.map((review) => (

              <SwiperSlide key={review.id}>

                <div
                  className="
                  h-full
                  rounded-3xl
                  bg-white
                  border
                  border-slate-200
                  shadow-lg
                  p-6
                  flex
                  flex-col
                  "
                >

                  <div className="flex items-center gap-4">

                    {review.photo ? (

                      <img
                        src={review.photo}
                        alt={review.name}
                        className="
                        w-14
                        h-14
                        rounded-full
                        object-cover
                        "
                      />

                    ) : (

                      <FaUserCircle
                        className="
                        text-5xl
                        text-slate-400
                        "
                      />

                    )}


                    <div>

                      <h3
                        className="
                        font-semibold
                        text-lg
                        "
                      >
                        {review.name || "Dream Mode Customer"}
                      </h3>


                      <div className="flex mt-1">

                        {Array.from({
                          length: 5,
                        }).map((_, i) => (

                          <FaStar
                            key={i}
                            className={
                              i < (review.rating || 5)
                                ? "text-amber-500"
                                : "text-gray-300"
                            }
                          />

                        ))}

                      </div>

                    </div>

                  </div>



                  <p
                    className="
                    mt-5
                    text-gray-600
                    leading-7
                    flex-1
                    "
                  >
                    “{review.review}”
                  </p>

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        )}



      </div>

    </section>

  );

}
