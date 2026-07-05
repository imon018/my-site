import { useEffect, useState } from "react";
import { getProductsFromDB, deleteProductFromDB } from "../../services/firestoreProductService";
import Button from "../../components/ui/Button";
import Spinner from "../../components/Spinner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const data = await getProductsFromDB();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteProductFromDB(id);
    fetchData();
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="space-y-4">

        {products.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center border p-4 rounded-xl"
          >

            <div>
              <h3 className="font-bold">{p.name}</h3>
              <p>৳ {p.price}</p>
            </div>

            <Button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500"
            >
              Delete
            </Button>

          </div>
        ))}

      </div>

    </div>
  );
}
