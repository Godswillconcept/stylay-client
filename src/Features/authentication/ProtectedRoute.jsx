import { useUser } from "./useUser";
import { Navigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, isLoading } = useUser();

  if (isLoading) return <FiLoader className="animate-spin" />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user.roles?.some(role => role.name === requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
