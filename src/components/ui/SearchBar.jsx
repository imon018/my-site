import { useState } from "react";

export default function SearchBar({
  onSearch,
}) {
  const [text, setText] =
    useState("");

  const handleSearch = (e) => {
    const value =
      e.target.value;

    setText(value);

    onSearch(value);
  };

  return (
    <input
      type="text"
      value={text}
      onChange={handleSearch}
      placeholder="Search products..."
      className="
        w-full
        bg-transparent
        px-5
        py-4
        rounded-2xl
        border
        border-gray-200
        focus:border-black
        transition
      "
    />
  );
}
