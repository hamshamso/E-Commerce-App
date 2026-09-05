import { useState, useEffect } from "react"; 
import { getOredersWithId } from "../services/api";
import { useParams, Link } from "react-router-dom";
import "../styles/ordersDetails.css";
import {RemoveProductFromOrder} from '../services/api'

export function OrderDetails() {
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
                const data = await getOredersWithId(token, id);
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
    const handleCancelProduct = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token || !order?._id || !productId) return;

        try {
            const res = await RemoveProductFromOrder(order._id, productId, token);
            console.log("Response from server:", res);
            if (res.success) {
                if (res.data) {
                    setOrder(res.data);
                } else {
                    setOrder((prevOrder) => ({
                        ...prevOrder,
                        items: prevOrder.items.filter(
                            (item) => (item.product?._id || item.product) !== productId
                        )
                    }));
                }
            } else {
                alert(res.msg || "Failed to remove product");
            }
        } catch (err) {
            console.error("Error removing product:", err);
            alert("An error occurred while removing the product.");
        }
    };

    if (loading) return <h1 className="loading">Loading details...</h1>;
    if (error || !order) return <h1 className="error">Error loading order details!</h1>;
    return (
        <div className="page-wrapper">
            <div className="orders-container">
                <div className="header-section">
                    <Link to="/orders" className="back-btn">← Back to Orders</Link>
                    <div className="order-meta">
                        <h1>Order #{order._id || id}</h1>
                        <span className={`status status-${order.status}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                <div className="items">
                    <table>
                        <thead>
                            <tr className="head">
                                <th>Product</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                {order.status === 'pending' && <th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {order.items && order.items.length > 0 ? (
                                order.items.map((item) => {
                                    const itemId = item._id || item.id || item.product?._id;
                                    const productId = item.product?._id || item.product;
                                    return (
                                        <tr key={itemId} className="card">
                                            <td>
                                                <img 
                                                    src={item.product?.image || item.image} 
                                                    alt={item.name} 
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
                                                <p className="price-text">💰 {item.price} DZD</p>
                                            </td>
                                            <td>
                                                <p className="quantity-text">x{item.quantity}</p>
                                            </td>
                                            {order.status === 'pending' && (
                                                <td>
                                                    <button 
                                                        className="cancel-btn"
                                                        onClick={() => handleCancelProduct(productId)}
                                                    >
                                                        Cancel Product
                                                    </button>
                                                </td>
                                            )}
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
                    </table>
                </div>
            </div>
        </div>
    );
}