import { useCart } from "../context/ProductContext";
import "../styles/cart.css";
import trashIcon from "../assets/trush.png";
import cartIcon from "../assets/cart.png"
import { useNavigate } from "react-router-dom";

export function Cart(){
  //100% engineernig (no vibecoding)
    const {cart,removeFromCart} = useCart()
    const Navigate = useNavigate()

    return(
      <>
        {cart.length === 0 ? 
          <div className="empty">
            <h1>Your cart is empty</h1>
            <h2>Buy some products and view it here</h2>
            <div className="buy" onClick={() =>{Navigate('/')}}>
                  <h3 className="buy-text">Shop</h3>
                  <img src={cartIcon} alt="cart Icon"/> 
            </div>
          </div> :
            <div className="cart">
              <h1 className="title">Your cart products</h1>
              {cart.map((item) => (
                <div className="items" key={item._id}>
                  <div className="item-card-split">
                    <div className="item-image-panel">
                      <img src={item.image} alt={item.name} className="item-img"/>
                    </div>

                    <div className="item-details-panel">
                      <p className="item-title">{item.name}</p>
                      <span className="item-price">{item.price} DA</span>
                      <span className="item-quantity">{item.quantity}</span>
                    </div>
                       <img src={trashIcon} alt="trush " className="remove-item" onClick={() => {removeFromCart(item._id)}} />
                  </div>
                 </div>))}
                 <div className="buy" onClick={() =>{Navigate('/checkout')}}>
                  <h3 className="buy-text">Buy</h3>
                  <img src={cartIcon} alt="cart Icon" /> 
                 </div>
               </div>
              }              
          </>
     )
  }