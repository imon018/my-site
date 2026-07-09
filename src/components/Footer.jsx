import { siteConfig } from "../config/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">

      <div className="container-box py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-bold">
              Dream Mode
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Premium fashion destination
              for modern style and elegance.
            </p>

          </div>

          <div>

            <h4 className="font-semibold text-lg mb-4">
              Quick Links
            </h4>

            <div className="space-y-3 text-gray-400">

              <p>Home</p>
              <p>Shop</p>
              <p>About</p>
              <p>Contact</p>

            </div>

          </div>

          <div>

            <h4 className="font-semibold text-lg mb-4">
              Customer Care
            </h4>

            <div className="space-y-3 text-gray-400">

              <p>Shipping</p>
              <p>Return Policy</p>
              <p>Privacy Policy</p>
              <p>Terms</p>

            </div>

          </div>

          <div>

            <h4 className="font-semibold text-lg mb-4">
              Contact
            </h4>

            <div className="space-y-3 text-gray-400">

              <p>
                📞 {siteConfig.phone}
              </p>

              <p>
                ✉️ {siteConfig.email}
              </p>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-gray-500">

          © 2026 Dream Mode.
          All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}
