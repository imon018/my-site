import { useState, useEffect } from "react";
import { getProducts } from "../../services/productService";
import ProductTable from "../../components/admin/ProductTable";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <ProductTable products={products} />

    </div>
  );
}
