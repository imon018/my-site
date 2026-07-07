import {
  FiUsers,
  FiShoppingCart,
  FiBox,
  FiDollarSign,
} from "react-icons/fi";

export default function Dashboard() {
  const cards = [
    {
      title: "Products",
      value: "0",
      icon: <FiBox size={30} />,
    },
    {
      title: "Orders",
      value: "0",
      icon: <FiShoppingCart size={30} />,
    },
    {
      title: "Users",
      value: "0",
      icon: <FiUsers size={30} />,
    },
    {
      title: "Revenue",
      value: "৳ 0",
      icon: <FiDollarSign size={30} />,
    },
  ];

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow p-6"
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div className="text-blue-600">
                {card.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}
