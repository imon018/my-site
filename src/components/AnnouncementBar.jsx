export default function AnnouncementBar() {
  const items = [
    "🚚 Free Delivery Over ৳3000",
    "🔥 New Premium Collection Available",
    "💎 Trusted By 5000+ Customers",
    "⚡ Fast Delivery All Over Bangladesh",
  ];

  return (
    <div
      className="
      bg-gradient-to-r
      from-blue-950
      via-slate-900
      to-blue-950
      text-white
      overflow-hidden
      h-10
      flex
      items-center
    "
    >
      <div className="marquee whitespace-nowrap">

        {items.map((item, index) => (
          <span
            key={index}
            className="mx-10 text-sm font-medium"
          >
            {item}
          </span>
        ))}

        {items.map((item, index) => (
          <span
            key={`copy-${index}`}
            className="mx-10 text-sm font-medium"
          >
            {item}
          </span>
        ))}

      </div>
    </div>
  );
}
