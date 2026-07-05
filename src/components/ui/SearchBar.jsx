import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const handleSearch = (e) => {
    setText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={text}
      onChange={handleSearch}
      placeholder="Search products..."
      className="w-full border rounded-xl px-4 py-2"
    />
  );
}
