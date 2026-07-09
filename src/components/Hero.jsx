import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getLatestBanner,
} from "../services/firestoreBannerService";

export default function Hero() {

  const [banner, setBanner] =
    useState(null);

  useEffect(() => {

    const loadBanner =
      async () => {

        const data =
          await getLatestBanner();

        setBanner(data);

      };

    loadBanner();

  }, []);

  return (

    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 md:py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT */}

          <div className="fade-up">

            <span
              className="
                inline-flex
                items-center
                px-4
                py-2
                rounded-full
                bg-white
                border
                border-gray-200
                shadow-sm
                text-sm
                font-medium
              "
            >
              ✨ New Arrival
            </span>

            <h1
              className="
                mt-6
                text-4xl
                md:text-6xl
                lg:text-7xl
                font-black
                leading-tight
              "
            >
              {banner?.title ||
                "Dream Mode"}
            </h1>

            <p
              className="
                mt-6
                text-gray-600
                text-lg
                leading-8
                max-w-xl
              "
            >
              {banner?.subtitle ||
                "Premium fashion for modern lifestyle."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <Link
                to="/shop"
                className="primary-btn text-center"
              >
                {banner?.buttonText ||
                  "Shop Now"}
              </Link>

              <Link
                to="/shop"
                className="outline-btn text-center"
              >
                Explore Collection
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="fade-up">

            <div
              className="
                overflow-hidden
                rounded-[35px]
                shadow-premium
              "
            >

              <img
                src={
                  banner?.image ||
                  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
                }
                alt="Banner"
                className="
                  w-full
                  h-[350px]
                  md:h-[500px]
                  lg:h-[650px]
                  object-cover
                  hover:scale-105
                  transition
                  duration-700
                "
              />

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}
