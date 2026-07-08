import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/ui/Button";

import {
  getProductById,
  updateProductInDB,
} from "../../services/firestoreProductService";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const product = await getProductById(id);

      if (!product) {
        alert("Product not found");
        navigate("/admin/products");
        return;
      }

      setName(product.name || "");
      setCategory(product.category || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setStock(product.stock || "");

      setImage(product.image || "");
      setImages(product.images || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCoverImage = (index) => {
    const updated = [...images];

    const selected = updated[index];

    updated.splice(index, 1);

    updated.unshift(selected);

    setImages(updated);
    setImage(updated[0]);
  };

  const removeImage = (index) => {
    const updated = images.filter(
      (_, i) => i !== index
    );

    setImages(updated);

    if (updated.length > 0) {
      setImage(updated[0]);
    } else {
      setImage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProductInDB(id, {
        name,
        category,
        description,
        price: Number(price),
        stock: Number(stock),

        image,
        images,
      });

      alert("Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <textarea
          rows={4}
          className="w-full border p-3 rounded-xl"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="number"
          className="w-full border p-3 rounded-xl"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="number"
          className="w-full border p-3 rounded-xl"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        {images.length > 0 && (
          <div>
            <h3 className="font-bold mb-3">
              Product Images
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-2"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-32 object-cover rounded-lg"
                  />

                  <div className="mt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleCoverImage(index)
                      }
                      className="bg-blue-600 text-white rounded-lg py-2"
                    >
                      Set Cover
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                      className="bg-red-600 text-white rounded-lg py-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button type="submit">
            Save Changes
          </Button>

          <Button
            type="button"
            className="bg-gray-700 hover:bg-gray-800"
            onClick={() =>
              navigate("/admin/products")
            }
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
