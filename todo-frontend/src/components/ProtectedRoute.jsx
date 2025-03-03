import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();

  console.log("🔹 [ProtectedRoute] Token:", token);

  if (token === undefined) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
