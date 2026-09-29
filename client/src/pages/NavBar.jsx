import { useNavigate, Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/ProductContext";
import { useState } from "react";

function Brand() {
  return (
    <Link to="/" className="brand">
      <svg className="brand-mark" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="bgShade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a5c46" />
            <stop offset="100%" stopColor="#043829" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#bgShade)" />

        <g transform="translate(20,18)">
          <path d="M60,38 Q22,96 80,158 Q58,96 60,38 Z" fill="#F8E7C9" opacity="0.92" />
          <path d="M100,38 Q138,96 80,158 Q102,96 100,38 Z" fill="#F8E7C9" />
          <circle cx="80" cy="36" r="7" fill="#0a3d2e" />
        </g>
      </svg>
      <span className="brand-name">Velora</span>
    </Link>
  );
}

function UserBadge({ name, role, onLogout }) {
  const initials = name ? name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase() : "?";
  return (
    <div className="state">
      <div className="user-info">
        <div className="avatar">{initials}</div>
        <div className="user-text">
          <span className="user-name">{name}</span>
          <span className="user-role">{role}</span>
        </div>
      </div>
      <button className="logout-btn" onClick={onLogout}>Log out</button>
    </div>
  );
}

function NavBar() {
  const navigate = useNavigate();
  const { isuser, logout, user, isAdmin } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (isAdmin()) {
    return (
      <nav className="navbar">
        <Brand />

        <div className="nav-links">
          <NavLink to="/" end className={linkClass}>Products</NavLink>
          <NavLink to="/products/create" className={linkClass}>Add product</NavLink>
          <NavLink to="/dashboard/orders" className={linkClass}>Orders</NavLink>
          <NavLink to="/dashboard/users" className={linkClass}>Users</NavLink>
        </div>

        <UserBadge name={user?.name} role="Admin" onLogout={handleLogout} />
      </nav>
    );
  }

  return (
    <nav className="navbar">

      <button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? "×" : "☰"}
      </button>

      <Brand />

      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>

        <NavLink
          to="/"
          className={linkClass}
          onClick={closeMenu}
        >
          Collections
        </NavLink>

        <NavLink
          to="/ourstory"
          className={linkClass}
          onClick={closeMenu}
        >
          Our Story
        </NavLink>

        {isuser() && (
          <NavLink
            to="/cart"
            className={linkClass}
            onClick={closeMenu}
          >
            Cart
            {totalItems > 0 && (
              <span className="nbr-items">
                {totalItems}
              </span>
            )}
          </NavLink>
        )}

        {isuser() && (
          <NavLink
            to="/orders"
            className={linkClass}
            onClick={closeMenu}
          >
            Orders
          </NavLink>
        )}

        {/* Mobile user section */}
        {isuser() && (
          <div className="mobile-user-section">
            <UserBadge
              name={user?.name}
              role="Member"
              onLogout={handleLogout}
            />
          </div>
        )}

      </div>

      {/* Desktop user/login section */}
      {!isuser() ? (
        <div className="login">
          <button
            className="loginbtn"
            onClick={() => {
              closeMenu();
              navigate("/login");
            }}
          >
            Log In
          </button>

          <button
            className="signupbtn"
            onClick={() => {
              closeMenu();
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      ) : (
        <div className="desktop-user">
          <UserBadge
            name={user?.name}
            role="Member"
            onLogout={handleLogout}
          />
        </div>
      )}

    </nav>
  );
}

export default NavBar;
