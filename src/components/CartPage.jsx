import useCart from "../hooks/useCart";
import Button from "./ui/Button";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-4 rounded-xl mb-3"
            >
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>৳ {item.price}</p>
              </div>

              <Button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500"
              >
                Remove
              </Button>
            </div>
          ))}

          <div className="mt-6 text-2xl font-bold">
            Total: ৳ {total}
          </div>

          <Button className="mt-4 w-full">
            Proceed to Checkout
          </Button>
        </>
      )}

    </div>
  );
}
