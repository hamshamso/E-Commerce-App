import '../styles/NavBar.css'
import {useNavigate} from 'react-router-dom'

function NavBar(){
    const navigate = useNavigate();
    return (
        <>
            <div className="navbar">
            <div class="links">
                <a href="#">Home</a>
                <a href="#">Services</a>
                <a href="#">Shop</a>
                <a href="#">About Us</a>
            </div>
            <div className="login">
                <button className="loginbtn"  onClick={() => navigate('/login')}>Log In</button>
                <button className="signupbtn" onClick={() => navigate('/Register')}>Register</button>
            </div>
            </div>
        </>
    )
}
export default NavBar 