// utils/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    // No hay token → redirigir al login
    return <Navigate to="/system/login" replace />;
  }

  // Si hay token, renderizar la vista protegida
  return children;
};

export default ProtectedRoute;