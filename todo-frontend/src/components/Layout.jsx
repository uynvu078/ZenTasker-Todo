import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import useAuthStore from "../store/authStore";

const Layout = () => {
  const { token } = useAuthStore();
  const location = useLocation();

  // Hide Sidebar on specific pages
  const hideSidebar = ["/login", "/register", "/welcome", "/forgot-password"].includes(location.pathname);

  return (
    <div className="main-layout">
      {!hideSidebar && token && <Sidebar />}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
