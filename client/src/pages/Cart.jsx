import { useCart } from "../context/ProductContext";
import "../styles/cart.css";
import trashIcon from '../assets/trush.png';
import cartIcon from "../assets/cart.png";
import { useNavigate } from "react-router-dom";

export function Cart() {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="page-wrapper">
                <div className="orders-container empty-container">
                    <div className="empty">
                        <h1>Your cart is empty</h1>
                        <h2>Buy some products and view them here</h2>
                        <button className="checkout-btn shop-btn" onClick={() => navigate('/')}>
                            <span>Shop Now</span>
                            <img src={cartIcon} alt="cart icon" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <div className="orders-container">
                <div className="header-section">
                    <h1>Your Shopping Cart</h1>
                </div>

                <div className="items">
                    <table>
                        <thead>
                            <tr className="head">
                                <th>Product</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item._id || item.id} className="card">
                                    <td>
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="table-img" 
                                        />
                                    </td>
                                    <td>
                                        <p className="name-text">{item.name}</p>
                                    </td>
                                    <td>
                                        <p className="price-text">{item.price} DA</p>
                                    </td>
                                    <td>
                                        <span className="quantity-badge">x{item.quantity}</span>
                                    </td>
                                    <td>
                                        <p className="item-total-text">{item.price * item.quantity} DA</p>
                                    </td>
                                    <td>
                                        <button 
                                            className="remove-btn" 
                                            onClick={() => removeFromCart(item._id || item.id)}
                                            title="Remove item"
                                        >
                                            <img src={trashIcon} alt="Remove" className="trash-icon" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="cart-footer">
                    <div className="total-summary">
                        <span>Total Amount:</span>
                        <strong>{totalPrice} DA</strong>
                    </div>
                    <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                        <span>Proceed to Checkout</span>
                        <img src={cartIcon} alt="cart icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}