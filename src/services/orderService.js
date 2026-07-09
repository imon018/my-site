import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const orderRef =
  collection(db, "orders");



// =========================
// Create Order (Customer)
// =========================

export const createOrder = async (
  order
) => {

  const docRef =
    await addDoc(
      orderRef,
      order
    );

  return docRef.id;

};



// =========================
// Get User Orders
// =========================

export const getUserOrders = async (
  email
) => {

  const q =
    query(
      orderRef,
      where(
        "email",
        "==",
        email
      )
    );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({

      id: doc.id,

      ...doc.data(),

    })
  );

};



// =========================
// Get All Orders (Admin)
// =========================

export const getAllOrders = async () => {

  const snapshot =
    await getDocs(
      orderRef
    );

  return snapshot.docs.map(
    (doc) => ({

      id: doc.id,

      ...doc.data(),

    })
  );

};



// =========================
// Update Order Status
// =========================

export const updateOrderStatus =
async (
  id,
  status
) => {

  const orderDoc =
    doc(
      db,
      "orders",
      id
    );

  await updateDoc(
    orderDoc,
    {
      status,
    }
  );

};



// =========================
// Admin Add Order
// =========================

export const addOrderByAdmin =
async (
  order
) => {

  const docRef =
    await addDoc(
      orderRef,
      order
    );

  return docRef.id;

};



// =========================
// Delete Order
// =========================

export const deleteOrder =
async (
  id
) => {

  const orderDoc =
    doc(
      db,
      "orders",
      id
    );

  await deleteDoc(
    orderDoc
  );

};



// =========================
// Customer Cancel Request
// =========================

export const requestCancelOrder =
async (
  id
) => {

  const orderDoc =
    doc(
      db,
      "orders",
      id
    );

  await updateDoc(
    orderDoc,
    {
      cancelRequested: true,
    }
  );

};



// =========================
// Customer Return Request
// =========================

export const requestReturnOrder =
async (
  id
) => {

  const orderDoc =
    doc(
      db,
      "orders",
      id
    );

  await updateDoc(
    orderDoc,
    {
      returnRequested: true,
    }
  );

};
