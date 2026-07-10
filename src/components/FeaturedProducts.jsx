import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FeaturedProductCard from "./FeaturedProductCard";

import {
  getLatestProducts,
} from "../services/firestoreProductService";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function FeaturedProducts() {

  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const data =
        await getLatestProducts();

      setProducts(data);

    } finally {

      setLoading(false);

    }

  };

  const chunkProducts = (
    items,
    size
  ) => {

    const chunks = [];

    for (
      let i = 0;
      i < items.length;
      i += size
    ) {

      chunks.push(
        items.slice(
          i,
          i + size
        )
      );

    }

    return chunks;

  };

  const slides =
    chunkProducts(
      products.slice(0, 8),
      4
    );

  return (

    <section className="section">

      <div className="container-box">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              border-amber-500
              shadow-[0_0_20px_rgba(245,158,11,.25)]
              bg-black/20
              mb-4
            "
          >
            <span className="text-amber-400">
              ✨
            </span>

            <span
              className="
                text-amber-400
                text-xs
                md:text-sm
                font-semibold
              "
            >
              Latest Collection
            </span>

          </div>

          <h2
            className="
              text-2xl
              md:text-4xl
              font-extrabold
              text-slate-900
            "
          >
            New Arrivals
          </h2>

          <p
            className="
              mt-2
              text-sm
              md:text-base
              text-slate-500
            "
          >
            Discover our latest premium collection
          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div
            className="
              text-center
              py-10
            "
          >
            Loading...
          </div>

        ) : (

          <Swiper
            modules={[
              Pagination,
            ]}
            pagination={{
              clickable: true,
            }}
            spaceBetween={20}
            className="pb-12"
          >

            {/* PRODUCT SLIDES */}

            {slides.map(
              (
                slideProducts,
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
                      md:gap-5
                    "
                  >

                    {slideProducts.map(
                      (product) => (

                        <FeaturedProductCard
                          key={
                            product.id
                          }
                          product={
                            product
                          }
                        />

                      )
                    )}

                  </div>

                </SwiperSlide>

              )
            )}

            {/* VIEW ALL */}

            <SwiperSlide>

              <div
                className="
                  h-[320px]
                  flex
                  items-center
                  justify-center
                "
              >

                <button
                  onClick={() =>
                    navigate("/shop")
                  }
                  className="
                    w-full
                    max-w-md
                    rounded-[30px]
                    border
                    border-amber-500
                    bg-gradient-to-br
                    from-[#021B4A]
                    via-[#03235F]
                    to-[#021B4A]
                    p-8
                    shadow-[0_0_20px_rgba(245,158,11,.45)]
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                >

                  <div className="text-center">

                    <div
                      className="
                        text-5xl
                        mb-4
                      "
                    >
                      ✨
                    </div>

                    <h3
                      className="
                        text-xl
                        md:text-2xl
                        font-bold
                        text-amber-400
                      "
                    >
                      View All Products
                    </h3>

                    <p
                      className="
                        mt-3
                        text-white/80
                        text-sm
                      "
                    >
                      Explore our complete premium collection
                    </p>

                  </div>

                </button>

              </div>

            </SwiperSlide>

          </Swiper>

        )}

      </div>

    </section>

  );

}
