import {
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaLock,
  FaHeadset,
  FaStore,
} from "react-icons/fa";


export default function WhyChooseUs() {

  const items = [
    {
      icon: FaShieldAlt,
      title: "100% Original",
      desc: "Premium Quality",
    },
    {
      icon: FaTruck,
      title: "Fast Delivery",
      desc: "On Time Delivery",
    },
    {
      icon: FaUndo,
      title: "Easy Return",
      desc: "3 Days Return Policy",
    },
    {
      icon: FaLock,
      title: "Secure Payment",
      desc: "Safe & Secure",
    },
    {
      icon: FaHeadset,
      title: "Best Support",
      desc: "24/7 Customer Support",
    },
    {
      icon: FaStore,
      title: "Trusted Shop",
      desc: "Thousands Happy Customers",
    },
  ];


  return (
    <section className="py-16 bg-white">

      <div className="container-box">


        {/* Title */}

        <div className="text-center mb-12">

          <h2 className="section-title">
            Why Choose Dream Mode
          </h2>

          <p className="section-subtitle">
            Premium shopping experience with trusted service
          </p>

        </div>



        {/* Feature Box */}

        <div
          className="
          bg-gradient-to-br
          from-[#0f172a]
          via-[#172554]
          to-[#1e3a8a]
          rounded-3xl
          p-6
          md:p-8
          grid
          grid-cols-2
          md:grid-cols-3
          gap-y-8
          gap-x-5
          shadow-xl
          "
        >


          {items.map((item,index)=>{

            const Icon = item.icon;


            return (

              <div
                key={index}
                className="
                flex
                items-center
                gap-3
                "
              >


                {/* Icon */}

                <div
                  className="
                  text-3xl
                  text-amber-500
                  "
                >
                  <Icon />
                </div>



                {/* Text */}

                <div>

                  <h3
                    className="
                    text-white
                    text-sm
                    md:text-base
                    font-semibold
                    "
                  >
                    {item.title}
                  </h3>


                  <p
                    className="
                    text-gray-300
                    text-xs
                    md:text-sm
                    mt-1
                    "
                  >
                    {item.desc}
                  </p>


                </div>


              </div>

            );

          })}


        </div>


      </div>


    </section>
  );
}
