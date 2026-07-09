import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import {
  getProductsFromDB,
} from "../services/firestoreProductService";

export default function RelatedProducts({
  currentId,
}) {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    loadProducts();
  }, [currentId]);

  const loadProducts =
    async () => {
      try {
        const data =
          await getProductsFromDB();

        const filtered =
          data
            .filter(
              (item) =>
                item.id !== currentId
            )
            .slice(0, 4);

        setProducts(filtered);
      } catch (error) {
        console.log(error);
      }
    };

  if (!products.length)
    return null;

  return (
    <section className="mt-24">

      <div className="text-center mb-12">

        <span className="text-sm uppercase tracking-[4px] text-gray-400">
          Discover More
        </span>

        <h2 className="text-3xl md:text-4xl font-bold mt-3">
          ✨ You May Also Like
        </h2>

        <p className="text-gray-500 mt-3">
          Handpicked products selected for you
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}
