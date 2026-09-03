import { useNavigate,Link} from "react-router-dom";
import "../styles/NavBar.css";
import {useAuth} from "../context/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const {isuser,logout,user} = useAuth()
  return (
    <>
      <div className="navbar">
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/">Shop</Link>
          <Link to="/">About Us</Link>
          {isuser ()&& (<Link to="/cart">My cart</Link>) }
          {isuser ()&& (<Link to="/orders">My orders</Link>) }
        </div>

        {!isuser () ? (
          <div className="login">
            <button className="loginbtn" onClick={() => navigate('/login')}>Log In</button>
            <button className="signupbtn" onClick={() => navigate('/register')}>Register</button>
          </div>
        ):(<div className="state">
                <h2 className="hi">Hi {user.name}</h2>
                <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
            </div>
        )}
      </div>
    </>
  );
}

export default NavBar;