import { useNavigate, Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useState} from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/ProductContext";
import homeIcon from "../assets/home.png"
import shopIcon from "../assets/shop.png"
import aboutIcon from "../assets/about.png"
import cartIcon from "../assets/cart.png"
import ordersIcon from "../assets/orders.png"
import userIcon from "../assets/user.png"
import logoutIcon from "../assets/logout.png"
import dashboard from "../assets/Dashboard.png"

function NavBar() {
  const navigate = useNavigate();
  const { isuser, logout, user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const {cart} = useCart();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getTotalItemsCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);    
  };

  if(isAdmin()) {
    return (
      <div>
        <div className="admin-top-bar">
          <Link className="admin-menu-btn" onClick={toggleSidebar}>
            <img src={dashboard} alt="Dashboard" className="nav-icon" />
          </Link>

          <div className="admin-login">
            <div className="admin-profile">
              <img src={userIcon} alt="User" className="admin-avatar-icon" />
              <h2 className="hi">Hi {user?.name}</h2>
            </div>
            <button 
              className="logout-admin-btn" 
              onClick={() => { logout(); navigate("/"); }}
            >
              <img src={logoutIcon} alt="Logout" className="logout-admin-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <h3>Admin Dashboard</h3>
            <button className="close-btn" onClick={toggleSidebar}>✕</button>
          </div>

          <ul className="sidebar-menu">
            <li><Link to="/" onClick={toggleSidebar}>Products</Link></li>
            <li><Link to='/products/create' onClick={toggleSidebar}>Add new product</Link></li>
            <li><Link onClick={toggleSidebar}>Orders</Link></li>
            <li><Link onClick={toggleSidebar}>Users</Link></li>
            <li><Link onClick={toggleSidebar}>Statistics</Link></li>
          </ul>
        </aside>
      </div>
    );
  }
      
  return (
    <div>
      <nav className="navbar">
        <div className="links">        
          <Link to="/" className="nav-link">
            <img src={homeIcon} alt="Home" className="nav-icon" />
            <span>Home</span>
          </Link>

          <Link to="/" className="nav-link">
            <img src={cartIcon} alt="Shop" className="nav-icon" />
            <span>Shop</span>
          </Link>

          <Link to="/" className="nav-link">
            <img src={aboutIcon} alt="About" className="nav-icon" />
            <span>About Us</span>
          </Link>

          {isuser() && (
            <Link to="/cart" className="nav-link">
              <img src={shopIcon} alt="Cart" className="nav-icon" />
              <span>My Cart</span>
              {getTotalItemsCount() > 0 && <span className="nbr-items">{getTotalItemsCount()}</span>}
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
      
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>E-Commerce Admin</h3>
          <button className="close-btn" onClick={toggleSidebar}>✕</button>
        </div>

        <ul className="sidebar-menu">
          <li><Link to="/">Products</Link></li>
          <li><Link to='/products/create'>Add new product</Link></li>
          <li><Link>Orders</Link></li>
          <li><Link>Users</Link></li>
          <li><Link>Statistics</Link></li>
        </ul>
      </aside>
    </div>    
  );
}

export default NavBar;