export default function StatsSection() {
  const stats = [
    {
      value: "5K+",
      label: "Happy Customers",
    },
    {
      value: "2K+",
      label: "Orders Delivered",
    },
    {
      value: "100+",
      label: "Premium Products",
    },
    {
      value: "24/7",
      label: "Customer Support",
    },
  ];

  return (
    <section className="py-20">

      <div className="container-box">

        <div
          className="
          relative
          overflow-hidden
          rounded-[40px]
          bg-gradient-to-br
          from-slate-950
          via-blue-950
          to-blue-900
          p-10
          md:p-16
          shadow-premium
        "
        >

          {/* GOLD GLOW */}

          <div
            className="
            absolute
            -top-20
            -left-20
            w-72
            h-72
            rounded-full
            bg-yellow-400/20
            blur-[120px]
          "
          />

          <div
            className="
            absolute
            -bottom-20
            -right-20
            w-72
            h-72
            rounded-full
            bg-blue-400/20
            blur-[120px]
          "
          />

          <div className="relative z-10">

            <div className="text-center mb-14">

              <h2
                className="
                text-3xl
                md:text-5xl
                font-black
                text-white
              "
              >
                Trusted By Thousands
              </h2>

              <p
                className="
                text-blue-100
                mt-4
                max-w-2xl
                mx-auto
              "
              >
                Delivering premium fashion
                and lifestyle products all
                over Bangladesh.
              </p>

            </div>

            <div
              className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-6
            "
            >

              {stats.map((item) => (
                <div
                  key={item.label}
                  className="
                  bg-white/10
                  backdrop-blur
                  border
                  border-white/10
                  rounded-[28px]
                  p-8
                  text-center
                "
                >

                  <h3
                    className="
                    text-4xl
                    md:text-5xl
                    font-black
                    text-yellow-400
                  "
                  >
                    {item.value}
                  </h3>

                  <p
                    className="
                    mt-3
                    text-blue-100
                  "
                  >
                    {item.label}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
