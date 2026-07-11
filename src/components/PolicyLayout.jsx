import { Link } from "react-router-dom";
import PolicySidebar from "./PolicySidebar";
import PolicyCTA from "./PolicyCTA";


export default function PolicyLayout({
  title,
  description,
  children,
}) {


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
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        "
      >


        {/* Breadcrumb */}

        <div
          className="
          mb-8
          text-sm
          text-slate-500
          flex
          gap-2
          "
        >

          <Link
            to="/"
            className="hover:text-amber-500"
          >
            Home
          </Link>

          <span>
            /
          </span>

          <span>
            Customer Service
          </span>

          <span>
            /
          </span>

          <span
            className="
            text-amber-500
            "
          >
            {title}
          </span>


        </div>





        <div
          className="
          grid
          lg:grid-cols-4
          gap-8
          "
        >


          {/* Sidebar */}

          <div
            className="
            lg:col-span-1
            "
          >

            <PolicySidebar />


          </div>






          {/* Main Content */}

          <div
            className="
            lg:col-span-3
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

                {title}

              </h1>



              <p
                className="
                mt-4
                text-slate-300
                "
              >

                {description}

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


                {children}


              </div>



              {/* Last Updated */}

              <p
                className="
                text-slate-400
                text-sm
                mt-6
                "
              >

                Last Updated:
                July 2026

              </p>



              <PolicyCTA />


            </div>



          </div>


        </div>


      </div>


    </section>

  );

}
