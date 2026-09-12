import { useState,useRef } from "react";
import { useCart } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";
import plus from "../assets/plus.png"
import mines from "../assets/mines.png"

function ProductCard({ product }) {
  const {isuser,isAdmin} = useAuth()
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added,setAdded] = useState(false)
  const reset = useRef(null)
  if (!product || product.quantity <= 0) {
    return null;
  }
  
  const decrease = () => setQty((q) => Math.max(1, q - 1));
  const increase = () => setQty((q) => Math.min(product.quantity, q + 1));

  const  hundelAddToCart = () => {
    addToCart(product, qty)
    setAdded(true)

    if (reset.current) clearTimeout(reset.current);//cancel the timer
    reset.current = setTimeout(() => { // set a timer to run and make setAdded(false) every click on Add to cart 
      setAdded(false)
    },1500)
  }
  
  return (
    <div className="product-card-split">
      <div className="product-image-panel">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details-panel">
        <span className="product-category-badge">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">{product.price.toLocaleString()} DA</p>

        <p className="product-stock">
          {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
        </p>

        <div className="qty-selector">
          <button type="button" onClick={decrease}><img src={mines} alt="plus" /></button>
          <span>{qty}</span>
          <button type="button" onClick={increase}><img src={plus} alt="plus" /></button>
        </div>
        <div className="btns">
            {!isAdmin() ?(
            <button
              className="btn"
              disabled={product.quantity === 0 || !isuser()}
              onClick={hundelAddToCart}  
              > 
            {!isuser() ? "Log in first" : added ? "✓ Added" : "Add to cart" }
            </button>)
             :
              (<Link className="btn-link" to={`/products/${product._id || product.id}`}>Edit</Link>
             )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
