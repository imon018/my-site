import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {
  getLatestProducts,
} from "../services/firestoreProductService";

export default function FeaturedProducts() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data =
        await getLatestProducts();

      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">

      <div className="container-box">

        <div className="text-center mb-14">

          <h2 className="section-title">
            New Arrivals
          </h2>

          <p className="section-subtitle">
            Discover our latest premium
            collection
          </p>

        </div>

        {loading ? (
          <div className="text-center">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>

    </section>
  );
}
