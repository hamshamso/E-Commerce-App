import { useState, useEffect } from "react";
import { getOrderById } from "../services/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { confirmOrder, canselOrder } from "../services/api.js";
import "../styles/ordersDetails.css";

export function EditOrdersStatus() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [status, setStatus] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchMyOrder = async () => {
            try {
                setLoading(true);
                setError(false);
                const token = localStorage.getItem("token");
                const data = await getOrderById(token, id);
                setOrder(data.data);
            } catch (err) {
                setError(true);
                console.error("Failed to fetch order details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchMyOrder();
    }, [id]);

    useEffect(() => {
        if (edit) navigate("/dashboard/orders");
    }, [edit, navigate]);

    const handelConfirmation = async (e, orderId, o) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await confirmOrder(token, orderId);
            setStatus(o.status);
            setEdit(true);
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const handelCanselation = async (e, orderId, o) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await canselOrder(token, orderId);
            setStatus(o.status);
            setEdit(true);
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    if (loading) return <h1 className="loading">Loading order items...</h1>;
    if (error || !order) return <h1 className="error">Error loading order items!</h1>;
    if (edit) return <h1>Order status is now: {status}</h1>;

    return (
        <div className="odt-page">
            <div className="odt-container">
                <Link to="/orders" className="odt-back">← Back to Orders</Link>

                <div className="odt-card">
                    <span className={`odt-status odt-status-${order.status}`}>
                        {order.status}
                    </span>

                    <h1 className="odt-title">Order items</h1>

                    <div className="odt-table-wrapper">
                        <table className="odt-table">
                            <thead>
                                <tr className="odt-head-row">
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
                                            <tr key={itemId} className="odt-row">
                                                <td>
                                                    <img
                                                        src={item.product?.image || item.image}
                                                        className="odt-img"
                                                        alt={item.name}
                                                    />
                                                </td>
                                                <td>
                                                    <p className="odt-name">{item.name}</p>
                                                </td>
                                                <td>
                                                    <p className="odt-category">{item.product?.category || "N/A"}</p>
                                                </td>
                                                <td>
                                                    <p className="odt-price">{item.price.toLocaleString()} DZD</p>
                                                </td>
                                                <td>
                                                    <p className="odt-qty">x{item.quantity}</p>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="odt-empty">
                                            No items found in this order.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="odt-summary">
                        <span>Client: <strong>{order.user.name}</strong></span>
                        <span>Total: <strong>{order.total.toLocaleString()} DZD</strong></span>
                    </div>

                    {(order.status === "pending" || order.status === "confirmed") && (
                        <div className="odt-actions">
                            <button
                                className="odt-confirm-btn"
                                onClick={(e) => handelConfirmation(e, order._id, order)}
                            >
                                Confirm ✓
                            </button>
                            <button
                                className="odt-cancel-btn"
                                onClick={(e) => handelCanselation(e, order._id, order)}
                            >
                                Cancel ✕
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}