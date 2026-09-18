import { useState, useEffect } from "react"; 
import { getOrderById } from "../services/api";
import { useParams, Link } from "react-router-dom";
import "../styles/ordersDetails.css";

export function EditOrdersStatus() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchMyOrder = async () => {
            try {
                setLoading(true);
                setError(false);
                const token = localStorage.getItem("token");
                const data = await getOrderById(token, id);
                setOrder(data.data || data);
            } catch (err) {
                setError(true);
                console.error("Failed to fetch order details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchMyOrder();
    }, [id]);
    if (loading) return <h1 className="loading">Loading order items...</h1>;
    if (error || !order) return <h1 className="error">Error loading order items!</h1>;
    //if (order.empty) return <h1>This order is empty</h1>
    return (
        <div className="page-wrapper">
            <div className="orders-container">
                <div className="header-section">
                    <Link to="/orders" className="back-btn">← Back to Orders</Link>
                    <div className="order-meta">
                        <h1>Order items</h1>
                        <span className={`status status-${order.status}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                <div className="items">
                    <table>
                        <thead>
                            <tr className="head">
                                <th>Product image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items && order.items.length > 0 ? (
                                order.items.map((item) => {
                                    const itemId = item._id || item.id || item.product?._id;
                                    return (
                                        <tr key={itemId} className="card">
                                            <td>
                                                <img 
                                                    src={item.product?.image || item.image} 
                                                    className="table-img"
                                                />
                                            </td>
                                            <td>
                                                <p className="name-text">{item.name}</p>
                                            </td>
                                            <td>
                                                <p className="category-text">{item.product?.category || "N/A"}</p>
                                            </td>
                                            <td>
                                                <p className="price-text">💰 {item.price.toLocaleString()} DZD</p>
                                            </td>
                                            <td>
                                                <p className="quantity-text">x{item.quantity}</p>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No items found in this order.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <h3>Client name: {order.user.name}</h3>
                        <h3>Total : {order.total}</h3>
                        <button>✓</button>
                        <button>✕</button>
                    </table>
                </div>
            </div>
        </div>
    );
}