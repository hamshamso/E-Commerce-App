import { useState } from "react";
import { useCart } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { createOrder } from "../services/api";
import "../styles/checkkout.css";

export function Checkout() {
    const { cart, clearCart } = useCart();
    const [formData, setFormData] = useState({ adress: "", phone: "" });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const hundlesubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const items = cart.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
            }));
            const orderPayload = {
                adress: formData.adress,
                phone: formData.phone,
                items,
            };
            await createOrder(orderPayload, token);
            setSubmit(true);
            setFormData({ adress: "" });
            clearCart();
            return false;
        } catch (e) {
            console.error(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="checkout-page-wrapper">
                <div className="checkout-card text-center">
                    <h1 className="loading-text">Processing your order...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="checkout-page-wrapper">
                <div className="checkout-card text-center">
                    <h1 className="error-text">Failed to place order. Please try again!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page-wrapper">
            <div className="checkout-card">
                {!submit ? (
                    <div>
                        <div className="checkout-header">
                            <h1>Checkout</h1>
                            <p>Enter your Adress to complete your order</p>
                        </div>

                        <div className="checkout-grid">
                            <form className="checkout-form" onSubmit={hundlesubmit}>
                                <div className="form-field">
                                    <label htmlFor="adress">Delivery Address</label>
                                    <input
                                        id="adress"
                                        name="adress"
                                        type="text"
                                        placeholder="Enter your street address, city"
                                        value={formData.adress}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="buy-btn">
                                    Confirm & Buy
                                </button>

                                <p className="switch-text">
                                    Need to add more items? <Link to="/">Continue Shopping 🛒</Link>
                                </p>
                            </form>

                            <div className="order-summary-box">
                                <h2>Order Summary</h2>
                                <div className="summary-items">
                                    {cart.map((item) => (
                                        <div key={item._id || item.id} className="summary-row">
                                            <div className="item-details">
                                                <span className="item-title">{item.name}</span>
                                                <span className="item-quantity">x{item.quantity}</span>
                                            </div>
                                            <span className="item-cost">{item.price * item.quantity} DA</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="summary-total-row">
                                    <span>Total Amount:</span>
                                    <strong>{cartTotal} DA</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="success-box">
                        <span className="success-badge">🎉</span>
                        <h1>Order Placed Successfully!</h1>
                        <p>Thank you for your purchase. We are processing your request.</p>
                        <div className="btn-group">
                            <Link to="/orders" className="btn-primary">View My Orders</Link>
                            <Link to="/" className="btn-secondary">Back to Home</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}