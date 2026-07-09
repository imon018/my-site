export default function StatsSection() {
  return (
    <section className="py-20">

      <div
        className="
          container-box
          bg-black
          text-white
          rounded-[40px]
          p-10
          md:p-16
        "
      >

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <div>
            <h3 className="text-4xl font-black">
              5K+
            </h3>
            <p className="text-gray-400 mt-2">
              Happy Customers
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black">
              2K+
            </h3>
            <p className="text-gray-400 mt-2">
              Orders
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black">
              100+
            </h3>
            <p className="text-gray-400 mt-2">
              Products
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black">
              24/7
            </h3>
            <p className="text-gray-400 mt-2">
              Support
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
