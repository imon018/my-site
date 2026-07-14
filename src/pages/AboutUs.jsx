import {
  useSettings
} from "../context/SettingsContext";

import {
  getSiteConfig
} from "../config/siteConfig";

export default function AboutUs() {


  const {
    settings
  } = useSettings();


  const site =
    getSiteConfig(settings);
  
  return (
    <section
      className="
      min-h-screen
      bg-slate-50
      py-10
      md:py-20
      "
    >

      <div
        className="
        max-w-5xl
        mx-auto
        px-4
        sm:px-6
        "
      >

        <div
          className="
          bg-gradient-to-br
          from-slate-950
          via-blue-950
          to-slate-900
          rounded-[35px]
          p-6
          md:p-10
          shadow-2xl
          "
        >

          <h1
            className="
            text-3xl
            md:text-5xl
            font-bold
            text-amber-500
            "
          >
            About Us
          </h1>


          <p
            className="
            mt-4
            text-slate-300
            leading-relaxed
            "
          >
            Welcome to {site.appName}, where fashion meets confidence.
            We believe every outfit tells a story and our mission is
            to help you dress your dream and live your style.
          </p>



          <div
            className="
            mt-8
            bg-white
            rounded-[30px]
            p-6
            md:p-10
            text-gray-700
            leading-8
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              text-blue-950
              mb-4
              "
            >
              Our Story
            </h2>


            <p>
              {site.appName} is a premium fashion destination focused on
              quality products, modern designs and customer satisfaction.
              We carefully select stylish dresses that match your lifestyle
              and make every moment special.
            </p>


            <h2
              className="
              text-2xl
              font-bold
              text-blue-950
              mt-8
              mb-4
              "
            >
              Our Promise
            </h2>


            <ul className="space-y-3">

              <li>
                ✓ Premium quality products
              </li>

              <li>
                ✓ Customer-friendly service
              </li>

              <li>
                ✓ Secure shopping experience
              </li>

              <li>
                ✓ Trendy fashion at affordable prices
              </li>

            </ul>


          </div>


        </div>


      </div>


    </section>
  );
}
