import { useNavigate, Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useAuth } from "../context/AuthContext";

import homeIcon from "../assets/icons/home.png";
import shopIcon from "../assets/icons/shop.png";
import aboutIcon from "../assets/icons/about.png";
import cartIcon from "../assets/icons/cart.png";
import ordersIcon from "../assets/icons/orders.png";
import userIcon from "../assets/icons/user.png";
import logoutIcon from "../assets/icons/logout.png";

function NavBar() {
  const navigate = useNavigate();
  const { isuser, logout, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="links">
        <Link to="/" className="nav-link">
          <img src={homeIcon} alt="Home" className="nav-icon" />
          <span>Home</span>
        </Link>

        <Link to="/" className="nav-link">
          <img src={shopIcon} alt="Shop" className="nav-icon" />
          <span>Shop</span>
        </Link>

        <Link to="/" className="nav-link">
          <img src={aboutIcon} alt="About" className="nav-icon" />
          <span>About Us</span>
        </Link>

        {isuser() && (
          <Link to="/cart" className="nav-link">
            <img src={cartIcon} alt="Cart" className="nav-icon" />
            <span>My Cart</span>
          </Link>
        )}

        {isuser() && (
          <Link to="/orders" className="nav-link">
            <img src={ordersIcon} alt="Orders" className="nav-icon" />
            <span>My Orders</span>
          </Link>
        )}
      </div>

      {!isuser() ? (
        <div className="login">
          <button className="loginbtn" onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="signupbtn" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      ) : (
        <div className="state">
          <div className="user-profile">
            <img src={userIcon} alt="User" className="user-avatar-icon" />
            <h2 className="hi">Hi {user?.name}</h2>
          </div>
          <button 
            className="logout-btn" 
            onClick={() => { logout(); navigate("/"); }}
          >
            <img src={logoutIcon} alt="Logout" className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;