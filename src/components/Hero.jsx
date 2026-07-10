import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBanners } from "../services/firestoreBannerService";

export default function Hero() {
  const [banners, setBanners] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  useEffect(() => {
    const load = async () => {
      const data =
        await getAllBanners();

      setBanners(data);
    };

    load();
  }, []);

  useEffect(() => {
    if (banners.length <= 1)
      return;

    const interval =
      setInterval(() => {
        setCurrent((prev) =>
          prev === banners.length - 1
            ? 0
            : prev + 1
        );
      }, 5000);

    return () =>
      clearInterval(interval);
  }, [banners]);

  const banner =
    banners[current];

  return (
    <section
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-blue-900
    "
    >
      <div className="absolute inset-0 opacity-20">

        <div
          className="
          absolute
          -top-40
          -left-40
          w-[500px]
          h-[500px]
          rounded-full
          bg-yellow-400
          blur-[180px]
        "
        />

        <div
          className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          rounded-full
          bg-blue-400
          blur-[180px]
        "
        />

      </div>

      <div className="container-box relative z-10 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}

          <div>

            <span
              className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2
              rounded-full
              bg-white/10
              border
              border-white/20
              text-yellow-300
              backdrop-blur
            "
            >
              ✨ Premium Collection
            </span>

            <h1
              className="
              mt-6
              text-white
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
              text-blue-100
              text-lg
              leading-8
              max-w-xl
            "
            >
              {banner?.subtitle ||
                "Luxury Fashion For Modern Lifestyle"}
            </p>

            <div
              className="
              flex
              flex-col
              sm:flex-row
              gap-4
              mt-10
            "
            >
              <Link
                to="/shop"
                className="primary-btn"
              >
                {banner?.buttonText ||
                  "Shop Now"}
              </Link>

              <Link
                to="/shop"
                className="outline-btn"
              >
                Explore Collection
              </Link>

            </div>

            <div
              className="
              grid
              grid-cols-3
              gap-6
              mt-12
              text-white
            "
            >
              <div>
                <h3 className="text-2xl font-bold text-yellow-400">
                  5K+
                </h3>

                <p className="text-sm text-blue-100">
                  Customers
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-yellow-400">
                  2K+
                </h3>

                <p className="text-sm text-blue-100">
                  Orders
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-yellow-400">
                  24/7
                </h3>

                <p className="text-sm text-blue-100">
                  Support
                </p>
              </div>
            </div>

            {/* SLIDER DOTS */}

            <div className="flex gap-3 mt-10">

              {banners.map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrent(index)
                    }
                    className={`h-3 rounded-full transition-all duration-300 ${
                      current === index
                        ? "w-10 bg-yellow-400"
                        : "w-3 bg-white/30"
                    }`}
                  />
                )
              )}

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div
              className="
              overflow-hidden
              rounded-[40px]
              border
              border-white/10
              shadow-premium
            "
            >

              <img
                src={
                  banner?.image
                }
                alt=""
                className="
                  h-[350px]
                  md:h-[500px]
                  lg:h-[700px]
                  w-full
                  object-cover
                "
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
