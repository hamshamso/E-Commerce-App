import '../styles/home.css'
function Home(){
    return (
        <>
    <div class="navbar">
        <div class="links">
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">Shop</a>
            <a href="#">About Us</a>
        </div>
        <div class="login">
            <button class="loginbtn">Log In</button>
            <button class="signupbtn" >Sign Up</button>
        </div>
    </div>
    <div class="welcome">
        <h1>Welcome to Our E-Commerce App </h1>
        <h2>Every Purshase Will Be Made </h2>
        <h2>With Pleasure</h2>
        <p>Buying and selling a good serices using the internet </p>
        <button class="getstarted">Get Started</button>
        <button class="learnmore" >Learn More</button>
    </div>
     </>
    )}
export default Home