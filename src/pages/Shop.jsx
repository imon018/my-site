import { useEffect, useState } from "react";
import { getProductsFromDB } from "../services/firestoreProductService";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductsFromDB();
      setProducts(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Shop
      </h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

    </div>
  );
}
