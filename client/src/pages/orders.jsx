import { getMyOrders } from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/orderr.css";

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
                setOrders(ordersList);
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
        <div className="page-wrapper">
            <div className="orders-container">
                <div className="header">
                    <h1>Your Previous Orders</h1>
                </div>

                {orders.length === 0 ? (
                    <p className="no-orders">No orders found.</p>
                ) : (
                    <div className="items">
                        <table>
                            <thead>
                                <tr className="head">
                                    <th>Status</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Total</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o._id || o.id} className="card">
                                        <td>
                                            <span className={`status status-${o.status}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td>
                                            <p className="phone">📞 {o.phone || o.address?.phone || o.adress?.phone || "N/A"}</p>
                                        </td>
                                        <td>
                                            <p className="address">🏠 {o.address || o.adress || "N/A"}</p>
                                        </td>
                                        <td>
                                            <p className="total">💰 {o.total} DZD</p>
                                        </td>
                                        <td>
                                            <Link className="view" to={`/orders/${o._id || o.id}`}>
                                                View Details 🛒
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}