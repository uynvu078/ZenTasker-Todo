import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  console.log(" [Navbar] Current user:", user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (user === undefined) return <div>Loading Navbar...</div>;

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ZenTasker Todo App</Link>
        <div className="navbar-content">
          {user ? (
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="nav-link" to="#/login">Login</Link>
              <Link className="nav-link" to="#/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
