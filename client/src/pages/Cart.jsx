import { useCart } from "../context/ProductContext";
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
            <>
              <h1 className="title">Your cart products</h1>
              {cart.map((item) => (
                <div className="items" key={item._id}>
                  <div className="item-card-split">
                    <div className="item-image-panel">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="item-details-panel">
                      <h3 className="item-title">{item.name}</h3>
                      <p className="item-price">{item.price} DA</p>
                      <p className="item-quantity">{item.quantity}</p>
                      <button
                        className="remove-item"
                        onClick={() => {removeFromCart(item._id)}} // I was about to make things worse with cart.filter((i) => i._id !== item._id) 
                        >Remove
                      </button>
                    </div>
                  </div>
                </div>))}
              </>}
          </>
     )
  }