import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-24">

      <div className="max-w-7xl mx-auto px-5 md:px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}

          <div>

            <h2 className="text-3xl font-black">
              Dream
              <span className="text-primary">
                Mode
              </span>
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Premium fashion and lifestyle
              products designed for modern
              shoppers.
            </p>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="hover:text-white transition"
              >
                Shop
              </Link>

              <Link
                to="/about"
                className="hover:text-white transition"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="hover:text-white transition"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* SUPPORT */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Customer Support
            </h3>

            <div className="space-y-3 text-gray-400">

              <p>
                📞 {siteConfig.phone}
              </p>

              <p>
                ✉️ {siteConfig.email}
              </p>

            </div>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="font-bold text-lg mb-5">
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
                px-5
                py-3
                rounded-full
                border
                border-white/20
                hover:bg-white
                hover:text-black
                transition
              "
            >
              Facebook
            </a>

          </div>

        </div>

        {/* BOTTOM */}

        <div
          className="
          border-t
          border-white/10
          mt-12
          pt-8
          text-center
          text-gray-500
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
