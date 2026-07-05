import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      <Link to="/" className="text-2xl font-bold text-primary">
        Dream Mode
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/cart">
          Cart ({cart.length})
        </Link>

      </div>

    </nav>
  );
}
