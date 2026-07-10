import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

export default function Footer() {
  return (
    <footer
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-slate-900
      text-white
      mt-24
    "
    >
      {/* Glow Effects */}

      <div
        className="
        absolute
        top-0
        left-0
        w-72
        h-72
        bg-yellow-500/10
        rounded-full
        blur-[120px]
      "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-72
        h-72
        bg-blue-500/20
        rounded-full
        blur-[120px]
      "
      />

      <div className="container-box relative z-10 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}

          <div>

            <h2 className="text-4xl font-black">

              Dream

              <span className="text-yellow-400">
                Mode
              </span>

            </h2>

            <p className="mt-5 text-blue-100 leading-7">

              Premium fashion and lifestyle
              products designed for modern
              shoppers.

            </p>

          </div>

          {/* LINKS */}

          <div>

            <h3 className="font-bold text-xl mb-5 text-yellow-400">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-blue-100">

              <Link
                to="/"
                className="hover:text-yellow-400 transition"
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="hover:text-yellow-400 transition"
              >
                Shop
              </Link>

              <Link
                to="/about"
                className="hover:text-yellow-400 transition"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="hover:text-yellow-400 transition"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* SUPPORT */}

          <div>

            <h3 className="font-bold text-xl mb-5 text-yellow-400">
              Customer Support
            </h3>

            <div className="space-y-4 text-blue-100">

              <p>
                📞 {siteConfig.phone}
              </p>

              <p>
                ✉️ {siteConfig.email}
              </p>

              <p>
                🚚 Nationwide Delivery
              </p>

              <p>
                💳 Cash On Delivery
              </p>

            </div>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="font-bold text-xl mb-5 text-yellow-400">
              Connect With Us
            </h3>

            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="
              inline-flex
              items-center
              justify-center
              px-6
              py-3
              rounded-full
              bg-yellow-400
              text-slate-900
              font-semibold
              hover:scale-105
              transition
            "
            >
              Facebook
            </a>

          </div>

        </div>

        {/* DELIVERY BAR */}

        <div
          className="
          mt-12
          rounded-[24px]
          border
          border-white/10
          bg-white/5
          backdrop-blur
          p-6
        "
        >

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <div>
              <p className="font-semibold">
                ✓ Secure Payment
              </p>
            </div>

            <div>
              <p className="font-semibold">
                ✓ Fast Delivery
              </p>
            </div>

            <div>
              <p className="font-semibold">
                ✓ Premium Quality
              </p>
            </div>

            <div>
              <p className="font-semibold">
                ✓ 24/7 Support
              </p>
            </div>

          </div>

        </div>

        {/* COPYRIGHT */}

        <div
          className="
          border-t
          border-white/10
          mt-12
          pt-8
          text-center
          text-blue-200
          text-sm
        "
        >
          © 2026 Dream Mode.
          All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}
