import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold text-primary">
        Welcome to Dream Mode
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        Bangladesh's Smart AI Powered E-Commerce Platform
      </p>

      <div className="mt-8 flex gap-4">

        <Link
          to="/shop"
          className="bg-primary text-white px-6 py-3 rounded-lg"
        >
          Shop Now
        </Link>

        <Link
          to="/login"
          className="border border-primary px-6 py-3 rounded-lg"
        >
          Login
        </Link>

      </div>

    </section>
  );
}
