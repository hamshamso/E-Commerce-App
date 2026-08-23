import { useNavigate, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <div className="navbar">
        <div className="links">
          <a href="/">Home</a>
          <a href="#">Services</a>
          <a href="#">Shop</a>
          <a href="#">About Us</a>
        </div>

        {!isAuthPage && (
          <div className="login">
            <button className="loginbtn" onClick={() => navigate('/login')}>Log In</button>
            <button className="signupbtn" onClick={() => navigate('/register')}>Register</button>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;