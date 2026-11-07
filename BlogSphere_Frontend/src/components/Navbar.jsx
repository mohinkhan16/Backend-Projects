import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, LogOut, User, PlusCircle, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <BookOpen className="brand-icon" />
          <span>BlogSphere</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Blogs
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/create-blog" className="nav-link btn-write">
                <PlusCircle size={18} />
                <span>Write Blog</span>
              </Link>
              <Link to="/profile" className="nav-link user-profile-link">
                {user?.Profile_Pic ? (
                  <img
                    src={user.Profile_Pic}
                    alt={user.Name}
                    className="avatar-small"
                  />
                ) : (
                  <User size={18} />
                )}
                <span>{user?.Name || "Profile"}</span>
              </Link>
              <button onClick={handleLogout} className="btn-logout" title="Logout">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-secondary">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="btn-primary">
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
