import {
  useEffect,
  useState,
} from "react";

import ProductCard from "../components/ProductCard";

import Spinner from "../components/Spinner";

import SearchBar from "../components/ui/SearchBar";

import {
  getProductsFromDB,
} from "../services/firestoreProductService";

export default function Shop() {
  const [products, setProducts] =
    useState([]);

  const [filteredProducts,
    setFilteredProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData =
      async () => {
        const data =
          await getProductsFromDB();

        setProducts(data);

        setFilteredProducts(data);

        setLoading(false);
      };

    fetchData();
  }, []);

  const handleSearch = (text) => {
    const keyword =
      text.toLowerCase();

    const filtered =
      products.filter(
        (product) =>
          product.name
            ?.toLowerCase()
            .includes(keyword)
      );

    setFilteredProducts(filtered);
  };

  if (loading)
    return <Spinner />;

  return (
    <>
      <section className="bg-[#faf7f2] py-20 text-center">

        <div className="container-box">

          <h1 className="text-5xl font-bold">
            Shop Collection
          </h1>

          <p className="mt-4 text-gray-500">
            Premium products curated
            for you
          </p>

        </div>

      </section>

      <section className="section">

        <div className="container-box">

          <div className="mb-10">
            <SearchBar
              onSearch={
                handleSearch
              }
            />
          </div>

          <p className="mb-6 text-gray-500">
            {filteredProducts.length}
            {" "}Products Found
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>

        </div>

      </section>
    </>
  );
}
