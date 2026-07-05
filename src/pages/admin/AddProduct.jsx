import { useState } from "react";
import Button from "../../components/ui/Button";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, price, image });
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <Button className="w-full">
          Save Product
        </Button>

      </form>

    </div>
  );
}
