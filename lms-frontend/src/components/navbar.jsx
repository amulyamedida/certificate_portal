import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2 className="logo">LMS Micro-Certification Portal</h2>
      <div>
        {user ? (
          <>
            <span className="welcome">Hi, {user.name}</span>
            <button
              className="btn"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
