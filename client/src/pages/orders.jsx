import { getMyOrders } from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/orders.css";

export function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                setLoading(true);
                setError(false);
                const token = localStorage.getItem("token");
                const data = await getMyOrders(token);

                const ordersList = Array.isArray(data) ? data : data?.data || [];

                const validOrders = ordersList.filter(
                    (o) => o.items && o.items.length > 0
                );

                setOrders(validOrders);
            } catch (err) {
                setError(true);
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, []);

    if (loading) return <h1 className="loading">Loading orders...</h1>;
    if (error) return <h1 className="error">Error loading orders!</h1>;

    return (
        <div className="mgnt-container">
            <h1 className="mgnt-title">Your Previous Orders</h1>

            {orders.length === 0 ? (
                <p className="No-orders">No orders found.</p>
            ) : (
                <div className="mgnt-table-wrapper">
                    <table className="mgnt-table">
                        <thead>
                            <tr className="mgnt-titles">
                                <td>Status</td>
                                <td>Phone</td>
                                <td>Address</td>
                                <td>Creation</td>
                                <td>Total</td>
                                <td>View</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => {
                                const statusClass = o.status ? o.status.toLowerCase() : 'pending';
                                return (
                                    <tr key={o._id || o.id} className="mgnt-single-order">
                                        <td>
                                            <span className={`status-mgnt-${statusClass}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="mgnt-order-phone">
                                             {o.phone || o.address?.phone || o.adress?.phone || "N/A"}
                                        </td>
                                        <td className="mgnt-order-adress">
                                             {o.address || o.adress || "N/A"}
                                        </td>
                                        <td className="mgnt-order-creation">
                                            {o.createdAt ? (
                                                <div className="date-time-wrapper">
                                                    <span className="order-date">
                                                        {new Date(o.createdAt).toLocaleDateString('en-GB', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className="order-time">
                                                        {new Date(o.createdAt).toLocaleTimeString('en-GB', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td className="mgnt-order-total">
                                             {(o.total ?? 0).toLocaleString()} DZD
                                        </td>
                                        <td className="mgnt-order-view">
                                            <Link to={`/orders/${o._id || o.id}`}>
                                                View 
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}