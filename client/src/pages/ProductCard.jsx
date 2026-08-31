import { useState,useRef } from "react";
import { useCart } from "../context/ProductContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added,setAdded] = useState(false)
  const reset = useRef(null)
  const decrease = () => setQty((q) => Math.max(1, q - 1));
  const increase = () => setQty((q) => Math.min(product.quantity, q + 1));

  const  hundelAddToCart = () => {
    addToCart(product, qty)
    setAdded(true)

    if (reset.current) clearTimeout(reset.current);//cancel any background timer
    reset.current = setTimeout(() => {
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
        <p className="product-price">{product.price} DA</p>

        <p className="product-stock">
          {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
        </p>

        <div className="qty-selector">
          <button type="button" onClick={decrease}>−</button>
          <span>{qty}</span>
          <button type="button" onClick={increase}>+</button>
        </div>

        <button
          className="add-to-cart-btn"
          disabled={product.quantity === 0}
          onClick={hundelAddToCart}
        >
          {added ? "✓ Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;