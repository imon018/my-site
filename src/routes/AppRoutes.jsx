import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<h1 style={{ padding: "40px" }}>Route Working ✅</h1>}
      />
    </Routes>
  );
}
