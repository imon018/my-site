export default function WhyChooseUs() {
  const items = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      desc: "Quick delivery all over Bangladesh",
    },
    {
      icon: "💯",
      title: "Authentic Products",
      desc: "Guaranteed premium quality",
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      desc: "Safe & trusted checkout process",
    },
    {
      icon: "❤️",
      title: "Customer First",
      desc: "Dedicated support for every customer",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-box">
        <div className="text-center mb-14">
          <h2 className="section-title">
            Why Choose Dream Mode
          </h2>

          <p className="section-subtitle">
            Premium shopping experience with trusted service
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="premium-card p-8 text-center"
            >
              <div className="text-5xl mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold text-xl">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
