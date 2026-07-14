import { useState } from "react";
import Button from "../../components/ui/Button";
import { addProductToDB } from "../../services/firestoreProductService";
import { uploadImages } from "../../services/uploadService";
import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  const [heroBanner, setHeroBanner] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !category ||
      !description ||
      !price ||
      !stock ||
      images.length === 0
    ) {
      errorToast(
        "Please fill in all fields."
      );
      return;
    }

    try {
      const uploadedImages =
        await uploadImages(images);

      await addProductToDB({
        name,
        category,
        description,

        price: Number(price),

        stock: Number(stock),

        image:
          uploadedImages[0].imageUrl,

        images: uploadedImages.map(
          (img) => img.imageUrl
        ),

        publicIds:
          uploadedImages.map(
            (img) => img.publicId
          ),

        heroBanner,

        createdAt: new Date(),
      });

      successToast(
        "Product added successfully!"
      );

      setName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setStock("");
      setImages([]);
      setHeroBanner(false);

      const fileInput =
        document.getElementById(
          "product-image"
        );

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      errorToast(
        err.message ||
          "Failed to add product."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Add Product
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
          className="w-full border p-3 rounded-xl"
          rows={4}
          placeholder="Product Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
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
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <div className="flex items-center gap-3 p-3 border rounded-xl">

          <input
            type="checkbox"
            id="heroBanner"
            checked={heroBanner}
            onChange={(e) =>
              setHeroBanner(
                e.target.checked
              )
            }
          />

          <label
            htmlFor="heroBanner"
            className="font-medium"
          >
            Use this product as Hero Banner
          </label>

        </div>

        <input
          id="product-image"
          type="file"
          multiple
          className="w-full"
          accept="image/*"
          onChange={(e) =>
            setImages(
              Array.from(
                e.target.files
              )
            )
          }
        />

        <Button
          type="submit"
          className="w-full"
        >
          Save Product
        </Button>

      </form>

    </div>
  );
}
