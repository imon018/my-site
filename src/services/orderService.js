import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const orderRef = collection(db, "orders");

function computeTotal(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => {
    const qty = Number(item.quantity || 1);
    const price = Number(item.price || 0);
    return sum + price * qty;
  }, 0);
}

export const createOrder = async (order) => {
  // Basic validation and normalization before sending to Firestore
  if (!order || typeof order !== "object") throw new Error("Invalid order payload");
  const { email, items } = order;
  if (!email) throw new Error("Order must include customer email");
  if (!items || !Array.isArray(items) || items.length === 0) throw new Error("Order must include at least one item");

  // Normalize items
  const normalized = items.map((it) => ({
    id: it.id,
    name: it.name,
    price: Number(it.price || 0),
    quantity: Number(it.quantity || 1),
    // optionally include image or other metadata if present
    image: it.image || null
  }));

  const total = computeTotal(normalized);

  const payload = {
    ...order,
    items: normalized,
    total
  };

  await addDoc(orderRef, payload);
};

export const getUserOrders = async (email) => {
  const q = query(orderRef, where("email", "==", email));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};
