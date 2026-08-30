import { useState } from "react";
import {useCart} from "../context/ProductContext"

import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart,removeFromCart} = useCart();
  const [qty, setQty] = useState(1);
  //Avoid rendering the negative and 0. 
  const decrease = () => setQty((q) => Math.max(1, q - 1));
  //aavoid passing the quantity limit 
  const increase = () => setQty((q) => Math.min(product.quantity, q + 1));
                                    //#064E3B #F8E7C9
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
          onClick={() => addToCart(product, qty)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;