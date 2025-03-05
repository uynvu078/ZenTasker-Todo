import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Forgot from "./pages/Forgot";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        {/* Protect Dashboard Route */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        {/* Redirect unknown routes to Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />  
      </Routes>
    </Router>
  );
}
