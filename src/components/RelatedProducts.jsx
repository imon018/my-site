import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import {
  getRelatedProducts,
} from "../services/firestoreProductService";

export default function RelatedProducts({
  category,
  currentId,
}) {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    loadProducts();
  }, [category, currentId]);

  const loadProducts =
    async () => {
      const data =
        await getRelatedProducts(
          category,
          currentId
        );

      setProducts(data);
    };

  if (!products.length)
    return null;

  return (
    <section className="mt-24">

      <div className="text-center mb-10">

        <h2 className="text-3xl font-bold">
          Related Products
        </h2>

        <p className="text-gray-500 mt-2">
          You may also like
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-8">

        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
          />
        ))}

      </div>

    </section>
  );
}
