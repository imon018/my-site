import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

export default function ProtectedAdminRoute({
  children,
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user.role !== "admin") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}
