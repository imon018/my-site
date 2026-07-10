import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getAllBanners,
} from "../services/firestoreBannerService";

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
      to-slate-900

      text-white
    "
    >
      {/* Glow Effects */}

      <div
        className="
        absolute
        top-0
        left-0
        w-96
        h-96
        rounded-full
        bg-yellow-400/10
        blur-[140px]
      "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-96
        h-96
        rounded-full
        bg-blue-500/20
        blur-[140px]
      "
      />

      <div className="container-box relative z-10 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div>

            <span
              className="
              inline-flex
              px-5
              py-2
              rounded-full
              bg-yellow-400
              text-slate-900
              font-semibold
            "
            >
              ✨ Premium Collection
            </span>

            <h1
              className="
              mt-6
              text-5xl
              md:text-6xl
              lg:text-7xl
              font-black
              leading-[1.05]
            "
            >
              {banner?.title ||
                "Dream Mode"}
            </h1>

            <p
              className="
              mt-6
              text-lg
              text-blue-100
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
                className="
                px-8
                py-4
                rounded-full
                bg-yellow-400
                text-slate-900
                font-semibold
                text-center
                hover:scale-105
                transition
              "
              >
                Shop Now
              </Link>

              <Link
                to="/shop"
                className="
                px-8
                py-4
                rounded-full
                border
                border-white/20
                bg-white/10
                backdrop-blur
                text-center
                hover:bg-white/20
                transition
              "
              >
                Explore
              </Link>

            </div>

            {/* Dots */}

            <div className="flex gap-3 mt-10">

              {banners.map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrent(index)
                    }
                    className={`
                      h-3
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        current === index
                          ? "w-10 bg-yellow-400"
                          : "w-3 bg-white/30"
                      }
                    `}
                  />
                )
              )}

            </div>

            {/* Features */}

            <div
              className="
              grid
              grid-cols-2
              gap-4
              mt-12
              text-sm
            "
            >

              <div>
                ✓ Premium Quality
              </div>

              <div>
                ✓ Fast Delivery
              </div>

              <div>
                ✓ Secure Payment
              </div>

              <div>
                ✓ Cash On Delivery
              </div>

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
              bg-white/5
              backdrop-blur
              shadow-2xl
            "
            >

              <img
                src={banner?.image}
                alt=""
                className="
                  h-[450px]
                  md:h-[550px]
                  lg:h-[700px]
                  w-full
                  object-cover
                  transition-all
                  duration-700
                  hover:scale-105
                "
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
