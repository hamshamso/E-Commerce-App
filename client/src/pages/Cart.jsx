import { useCart } from "../context/ProductContext";
import "../styles/cart.css";
import trashIcon from "../assets/trush.png";

export function Cart(){
  //100% engineernig (no vibecoding)
    const {cart,removeFromCart} = useCart()
    return(
      <>
        {cart.length === 0 ? 
          <div className="empty">
            <h1>Your cart is empty</h1>
            <h3>Buy some products and view it here</h3>
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
              </div>}
          </>
     )
  }