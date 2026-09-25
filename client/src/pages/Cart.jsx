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
            <div className="cart-mgnt-container">
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
        <div className="cart-mgnt-container">
            <div className="header-section" style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 className="cart-mgnt-title" style={{ margin: 0 }}>Your Shopping Cart</h1>
            </div>

            <div className="cart-mgnt-table-wrapper">
                <table className="cart-mgnt-table">
                    <thead>
                        <tr className="cart-mgnt-titles">
                            <td>Product</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Total</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item._id || item.id} className="cart-mgnt-single-row">
                                <td>
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                </td>
                                <td>
                                    <span className="cart-mgnt-name">{item.name}</span>
                                </td>
                                <td>
                                    <span className="cart-mgnt-price">{item.price.toLocaleString()} DA</span>
                                </td>
                                <td>
                                    <span className="cart-mgnt-quantity">x{item.quantity.toLocaleString()}</span>
                                </td>
                                <td>
                                    <span className="cart-mgnt-total">{(item.price * item.quantity).toLocaleString()} DA</span>
                                </td>
                                <td>
                                    <button 
                                        className="cart-mgnt-remove-btn" 
                                        onClick={() => removeFromCart(item._id || item.id)}
                                        title="Remove item"
                                    >
                                        <img className="cart-mgnt-remove-icon"src={trashIcon} alt="Remove" style={{ width: "16px", height: "16px" }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="cart-mgnt-footer" style={{ marginTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}>
                <div className="cart-mgnt-summary" style={{ fontSize: "1.1rem" }}>
                    <span>Total Amount: </span>
                    <strong style={{ color: "#2c2825" }}>{totalPrice.toLocaleString()} DA</strong>
                </div>
                <button 
                    className="checkout-btn" 
                    onClick={() => navigate('/checkout')}>Proceed to Checkout
                </button>
            </div>
        </div>
    );
}