import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import Button from "./ui/Button";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

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
                <p>৳ {item.price} x {item.quantity || 1} = ৳ {item.price * (item.quantity || 1)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                  aria-label={`Decrease quantity for ${item.name}`}
                >
                  −
                </button>

                <div className="px-3">{item.quantity || 1}</div>

                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                  aria-label={`Increase quantity for ${item.name}`}
                >
                  +
                </button>

                <Button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-2xl font-bold">
            Total: ৳ {total}
          </div>

          <Button className="mt-4 w-full" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </Button>
        </>
      )}

    </div>
  );
}
