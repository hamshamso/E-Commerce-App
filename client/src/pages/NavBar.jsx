import { useNavigate, Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/ProductContext";

function Brand() {
  return (
    <Link to="/" className="brand">
      <svg className="brand-mark" viewBox="0 0 40 40" width="34" height="34">
        <rect x="8" y="8" width="24" height="24" rx="5" transform="rotate(45 20 20)" fill="none" stroke="#064E3B" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fontFamily="'Libre Baskerville', serif" fontSize="14" fontWeight="700" fill="#064E3B">V</text>
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

  const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  if (isAdmin()) {
    return (
      <nav className="navbar">
        <Brand />

        <div className="nav-links">
          <NavLink to="/" end className={linkClass}>Products</NavLink>
          <NavLink to="/products/create" className={linkClass}>Add product</NavLink>
          <NavLink to="/dashboard/orders" className={linkClass}>Orders</NavLink>
          <NavLink to="/dashboard/users" className={linkClass}>Users</NavLink>
          <NavLink to="/dashboard/statistics" className={linkClass}>Statistics</NavLink>
        </div>

        <UserBadge name={user?.name} role="Admin" onLogout={handleLogout} />
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Brand />

      <div className="nav-links">
        <NavLink to="/" className={linkClass}>Collections</NavLink>
        <NavLink to="/about" className={linkClass}>Our Story</NavLink>
        {isuser() && (
          <NavLink to="/cart" className={linkClass}>
            Cart
            {totalItems > 0 && <span className="nbr-items">{totalItems}</span>}
          </NavLink>
        )}
        {isuser() && (
          <NavLink to="/orders" className={linkClass}>Orders</NavLink>
        )}
      </div>

      {!isuser() ? (
        <div className="login">
          <button className="loginbtn" onClick={() => navigate("/login")}>Log In</button>
          <button className="signupbtn" onClick={() => navigate("/register")}>Register</button>
        </div>
      ) : (
        <UserBadge name={user?.name} role="Member" onLogout={handleLogout} />
      )}
    </nav>
  );
}

export default NavBar;