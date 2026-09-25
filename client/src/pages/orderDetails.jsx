import { useState, useEffect } from "react"; 
import { getOredersWithId } from "../services/api";
import { useParams, Link } from "react-router-dom";
import "../styles/ordersDetails.css";
import { RemoveProductFromOrder } from '../services/api';

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
                        items: prevOrder.items.filter((item) => (item.product?._id || item.product) !== productId)
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

    // Helper for status classes matching your table styles
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'shipped': return 'status-mgnt-shipped';
            case 'confirmed': return 'status-mgnt-confirmed';
            case 'pending': return 'status-mgnt-pending';
            case 'cancelled':
            case 'canceled': return 'status-mgnt-cancelled';
            default: return 'status-mgnt-pending';
        }
    };

    return (
        <div className="mgnt-container">
            <div className="header-section" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="top-table">
                    <h1 className="mgnt-title">Your Order</h1>
                    <Link to="/orders" className="mgnt-order-view" style={{ textDecoration: "none" }}>← Back to Orders</Link>
                </div>
                <div className="order-meta" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span className={getStatusClass(order.status)}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="mgnt-table-wrapper">
                <table className="mgnt-table">
                    <thead>
                        <tr className="mgnt-titles">
                            <td>Product</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            {order.status === 'pending' && <td>Action</td>}
                        </tr>
                    </thead>
                    <tbody>
                        {order.items && order.items.length > 0 ? (
                            order.items.map((item) => {
                                const itemId = item._id || item.id || item.product?._id;
                                const productId = item.product?._id || item.product;
                                return (
                                    <tr key={itemId} className="mgnt-single-order">
                                        <td>
                                            <img 
                                                src={item.product?.image || item.image} 
                                                alt={item.name} 
                                                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                                            />
                                        </td>
                                        <td>
                                            <span className="mgnt-order-name">{item.name}</span>
                                        </td>
                                        <td>
                                            <span className="mgnt-order-adress">{item.product?.category || "N/A"}</span>
                                        </td>
                                        <td>
                                            <span className="mgnt-order-total">{item.price.toLocaleString()} DZD</span>
                                        </td>
                                        <td>
                                            <span className="mgnt-order-phone">x{item.quantity}</span>
                                        </td>
                                        {order.status === 'pending' && (
                                            <td className="mgnt-order-view">
                                                <button 
                                                    onClick={() => handleCancelProduct(productId)}
                                                    style={{ cursor: "pointer" }}
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
                                <td colSpan="6" style={{ textAlign: "center", padding: "30px" }}>
                                    <span className="No-orders">No items found in this order.</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}