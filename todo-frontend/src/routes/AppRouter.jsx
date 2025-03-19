import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Forgot from "./pages/Forgot";
import useAuthStore from "./store/authStore";

export default function AppRouter() {

  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>

        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Welcome />} />
        {/* <Route path="/" element={<Welcome />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />

        {/* Protect Dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </Router>
  );
}
