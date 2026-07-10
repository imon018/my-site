import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";

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

        <div className="text-center mb-10">

          <h2 className="section-title">
            New Arrivals
          </h2>

          <p className="section-subtitle">
            Discover our latest premium
            collection
          </p>

        </div>

        {loading ? (

          <div className="text-center">
            Loading...
          </div>

        ) : (

          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            spaceBetween={20}
            className="pb-12"
          >

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
                    gap-4
                    lg:grid-cols-4
                    lg:gap-6
                  "
                  >

                    {slideProducts.map(
                      (product) => (

                        <ProductCard
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

            <SwiperSlide>

              <div
                className="
                min-h-[420px]
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
                    rounded-[36px]
                    border
                    border-amber-500
                    bg-gradient-to-br
                    from-[#021B4A]
                    via-[#03235F]
                    to-[#021B4A]
                    p-10
                    shadow-[0_0_20px_rgba(245,158,11,.45)]
                    transition-all
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
                      text-2xl
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
                    "
                    >
                      Explore our complete
                      premium collection
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
