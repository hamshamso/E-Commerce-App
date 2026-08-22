import '../styles/home.css'
function Home(){
    return (
        <>
    <div className="landing">
        <div className='welcome'>
        <h1>Welcome to Our E-Commerce App </h1>
        <h2>Every Purshase Will Be Made With Pleasure</h2>
        <p>Buying and selling a good serices using the internet </p>
        <button className="getstarted">Get Started</button>
        <button className="learnmore" >About Us</button>
        </div>
        <img src="poster" alt="" />
    </div>
    <footer>
        <div>
            <p className='rights'>© 2026 E-Commerce.    All rights reserved.</p>
        </div>
        <div className="fot">
            <a>Legal Notice</a>
            <a>Privacy</a>
            <a>Terms</a>
            <a>· Algérie</a>
    </div>
    </footer>
     </>
    )}
export default Home