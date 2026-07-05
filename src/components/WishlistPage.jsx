import useWishlist from "../hooks/useWishlist";
import Button from "./ui/Button";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-6">
        Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center border p-4 rounded-xl mb-3"
          >
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p>৳ {item.price}</p>
            </div>

            <Button
              onClick={() => removeFromWishlist(item.id)}
              className="bg-red-500"
            >
              Remove
            </Button>
          </div>
        ))
      )}

    </div>
  );
}
