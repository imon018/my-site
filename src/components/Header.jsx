import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { logout } from "../services/authService";

export default function Header() {
  const { user } = useAuth();
  const { cartCount } = useCart();

  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Top Bar */}

      <div className="bg-black text-white text-sm py-2 px-4 text-center">
        🚚 Fast Delivery All Over Bangladesh
      </div>

      {/* Header */}

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">

        <div className="container-box">

          <div className="h-20 flex items-center justify-between">

            <Link
              to="/"
              className="text-3xl font-bold"
            >
              Dream Mode
            </Link>

            {/* Desktop */}

            <nav className="hidden lg:flex items-center gap-8 font-medium">

              <Link to="/">Home</Link>

              <Link to="/shop">Shop</Link>

              <Link to="/about">
                About
              </Link>

              <Link to="/contact">
                Contact
              </Link>

              <Link to="/cart">
                Cart ({cartCount})
              </Link>

              {!user ? (
                <>
                  <Link to="/login">
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="primary-btn"
                  >
                    Join
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile">
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>

            {/* Mobile */}

            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="lg:hidden text-2xl"
            >
              ☰
            </button>

          </div>

        </div>

        {mobileMenu && (
          <div className="lg:hidden bg-white border-t">

            <div className="flex flex-col p-6 gap-5">

              <Link to="/">
                Home
              </Link>

              <Link to="/shop">
                Shop
              </Link>

              <Link to="/cart">
                Cart ({cartCount})
              </Link>

              <Link to="/contact">
                Contact
              </Link>

            </div>

          </div>
        )}
      </header>
    </>
  );
}
