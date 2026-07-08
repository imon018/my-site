import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";

import {
  getProductsFromDB,
  deleteProductFromDB,
} from "../../services/firestoreProductService";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProductsFromDB();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Delete "${name}" ?`
    );

    if (!confirmDelete) return;

    try {
      await deleteProductFromDB(id);

      setProducts((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Products Management
        </h1>

        <Button
          onClick={() =>
            navigate("/admin/add-product")
          }
        >
          Add Product
        </Button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search product by name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      {loading ? (
        <p className="text-center">
          Loading products...
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center">
          No products found
        </p>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4">
                    ৳ {product.price}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        className="px-4 py-2"
                        onClick={() =>
                          navigate(
                            `/admin/edit-product/${product.id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <button
                        onClick={() =>
                          handleDelete(
                            product.id,
                            product.name
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
