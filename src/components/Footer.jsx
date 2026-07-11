import { Link } from "react-router-dom";

import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiYoutube,
} from "react-icons/fi";

import {
  FaTiktok,
} from "react-icons/fa";


import {
  siteConfig,
} from "../config/siteConfig";



export default function Footer(){


  return (


    <footer

      className="
        bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-slate-900
        text-white
        mt-1
      "

    >


      <div

        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-8
          py-14
          lg:py-16
          pb-28
          md:pb-16
        "

      >



        <div

          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
            lg:gap-12
          "

        >



          {/* BRAND */}


          <div>


            <div

              className="
                flex
                items-center
                gap-3
              "

            >


              <img

                src="/logo.png"

                alt="Dream Mode Logo"

                className="
                  w-16
                  h-16
                  lg:w-20
                  lg:h-20
                  object-contain
                "

              />



              <div>


                <p

                  className="
                    text-xl
                    font-bold
                    text-white
                  "

                >
                  Dream Mode
                </p>



                <p

                  className="
                    text-xs
                    text-yellow-400
                  "

                >
                  Premium Fashion Store
                </p>


              </div>


            </div>





            <p

              className="
                mt-5
                text-slate-300
                leading-7
                text-sm
                lg:text-base
              "

            >

              Premium fashion &
              lifestyle products
              designed for modern
              shoppers.

            </p>





            <div

              className="
                flex
                gap-4
                mt-6
              "

            >


              <a

                href="#"

                className="
                  w-9
                  h-9
                  rounded-full
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  hover:bg-yellow-400
                  hover:text-black
                  transition
                "

              >

                <FiFacebook/>

              </a>




              <a

                href="#"

                className="
                  w-9
                  h-9
                  rounded-full
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  hover:bg-yellow-400
                  hover:text-black
                  transition
                "

              >

                <FiInstagram/>

              </a>





              <a

                href="#"

                className="
                  w-9
                  h-9
                  rounded-full
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  hover:bg-yellow-400
                  hover:text-black
                  transition
                "

              >

                <FaTiktok/>

              </a>





              <a

                href="#"

                className="
                  w-9
                  h-9
                  rounded-full
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  hover:bg-yellow-400
                  hover:text-black
                  transition
                "

              >

                <FiYoutube/>

              </a>


            </div>


          </div>






          {/* QUICK LINKS */}


          <div>


            <h3

              className="
                text-lg
                font-bold
                mb-5
                text-yellow-400
              "

            >

              Quick Links

            </h3>




            <div

              className="
                flex
                flex-col
                gap-3
                text-slate-300
              "

            >


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

                to="/cart"

                className="hover:text-yellow-400 transition"

              >

                Cart

              </Link>




              <Link

                to="/profile"

                className="hover:text-yellow-400 transition"

              >

                Profile

              </Link>


            </div>


          </div>








          {/* CONTACT */}


          <div>


            <h3

              className="
                text-lg
                font-bold
                mb-5
                text-yellow-400
              "

            >

              Contact

            </h3>




            <div

              className="
                space-y-5
                text-slate-300
                text-sm
              "

            >



              <div

                className="
                  flex
                  gap-3
                  items-center
                "

              >

                <FiPhone/>

                <span>

                  {siteConfig.phone}

                </span>


              </div>






              <div

                className="
                  flex
                  gap-3
                  items-center
                "

              >

                <FiMail/>

                <span className="break-all">

                  {siteConfig.email}

                </span>


              </div>






              <div

                className="
                  flex
                  gap-3
                  items-center
                "

              >

                <FiMapPin/>


                <span>

                  Dhaka, Bangladesh

                </span>


              </div>


            </div>


          </div>









          {/* PAYMENT */}


          <div>


            <h3

              className="
                text-lg
                font-bold
                mb-5
                text-yellow-400
              "

            >

              Payment

            </h3>




            <div

              className="
                flex
                flex-wrap
                gap-3
              "

            >



              <div

                className="
                  bg-white
                  text-black
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-bold
                "

              >

                VISA

              </div>





              <div

                className="
                  bg-white
                  text-black
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-bold
                "

              >

                Master

              </div>





              <div

                className="
                  bg-white
                  text-black
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-bold
                "

              >

                bKash

              </div>





              <div

                className="
                  bg-white
                  text-black
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-bold
                "

              >

                Nagad

              </div>



            </div>


          </div>





        </div>







        {/* BOTTOM */}



        <div

          className="
            border-t
            border-white/10
            mt-12
            pt-6
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-3
            text-center
          "

        >



          <p

            className="
              text-slate-400
              text-sm
            "

          >

            © 2026 Dream Mode.
            All Rights Reserved.

          </p>





          <p

            className="
              text-yellow-400
              text-sm
              font-medium
            "

          >

            Premium Fashion Store

          </p>



        </div>




      </div>


    </footer>


  );


}
