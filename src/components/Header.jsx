import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

import {
  logout,
} from "../services/authService";

export default function Header() {
  const { user } = useAuth();

  const { cartCount } = useCart();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleLogout =
    async () => {
      await logout();
      navigate("/login");
    };

  return (
    <>
      {/* HEADER */}

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">

        <div className="container-box h-20 flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold tracking-tight"
          >
            <span className="gradient-text">
              Dream Mode
            </span>
          </Link>

          {/* DESKTOP MENU */}

          <nav className="hidden md:flex items-center gap-8 font-medium">

            <Link
              to="/"
              className="hover:text-black text-gray-600"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="hover:text-black text-gray-600"
            >
              Shop
            </Link>

            <Link
              to="/cart"
              className="relative hover:text-black text-gray-600"
            >
              Cart

              {cartCount > 0 && (
                <span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="hover:text-black text-gray-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="primary-btn"
                >
                  Join Now
                </Link>
              </>
            ) : user.role === "admin" ? (
              <>
                <Link
                  to="/admin"
                  className="hover:text-black text-gray-600"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="hover:text-black text-gray-600"
                >
                  {user.name ||
                    user.email?.split("@")[0]}
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            )}

          </nav>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden text-3xl"
          >
            ☰
          </button>

        </div>

      </header>

      {/* MOBILE DRAWER */}

      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[100] shadow-2xl transition-all duration-300 md:hidden ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold">
              Menu
            </h2>

            <button
              onClick={() =>
                setMenuOpen(false)
              }
              className="text-3xl"
            >
              ×
            </button>

          </div>

          <div className="mt-8 flex flex-col gap-5">

            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Shop
            </Link>

            <Link
              to="/cart"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Cart ({cartCount})
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Register
                </Link>
              </>
            ) : user.role === "admin" ? (
              <>
                <Link
                  to="/admin"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Admin Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>

      </div>

      {/* OVERLAY */}

      {menuOpen && (
        <div
          onClick={() =>
            setMenuOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
        />
      )}
    </>
  );
}
