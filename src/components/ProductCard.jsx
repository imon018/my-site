import Button from "./ui/Button";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">

      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="font-bold text-lg">

          {product.name}

        </h3>

        <p className="text-primary text-xl mt-2">

          ৳ {product.price}

        </p>

        <Button className="w-full mt-5">

          Add to Cart

        </Button>

      </div>

    </div>
  );
}
