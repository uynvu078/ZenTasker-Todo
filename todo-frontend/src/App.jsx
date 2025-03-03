import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Forgot from "./pages/Forgot";


const AppLayout = () => {
  const location = useLocation();
  const hideSidebarPages = ["/", "/login", "/register", "/forgot-password"];
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="dashboard-layout">
      {!hideSidebarPages.includes(location.pathname) && <Sidebar />}

      <div className="dashboard-content">
        {!isDashboard && <Navbar />}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
