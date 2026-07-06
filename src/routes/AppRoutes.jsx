import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Contact from "../pages/Contact";
import OrderSuccess from "../pages/OrderSuccess";
import NotFound from "../pages/NotFound";

// Admin
import ProtectedAdminRoute from "../routes/ProtectedAdminRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/Products";
import AddProduct from "../pages/admin/AddProduct";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes - protected */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <ProtectedAdminRoute>
              <AddProduct />
            </ProtectedAdminRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
