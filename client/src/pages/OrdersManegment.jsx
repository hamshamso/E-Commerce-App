import '../styles/OrderManegment.css';
import { getDetailedOrders } from '../services/api.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export function OrderManegment (){
    const [orders,setOrders] = useState([])
useEffect(()=>{
    const fetchDetailedOrders = async() =>{
        try{
            const token = localStorage.getItem("token");
            const res = await getDetailedOrders(token)
            console.log("API Response:", res);
            console.log("data",res.data)
            setOrders(res.data)
        }catch{
            console.error("failed to fetch Detailed orders")
        }
    }
    fetchDetailedOrders()
},[])

    return(
        <>
            <h1 className="mgnt-title" >Orders</h1>
            <table className="mgnt-table" >
                <thead>
                    <tr className="mgnt-titles">
                        <td>Status</td>
                        <td>Name</td>
                        <td>Adress</td>
                        <td>Phone</td>
                        <td>Creation</td>
                        <td>Last update</td>
                        <td>Total</td>
                        <td>View</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map( (o) => (
                        <tr key={o._id} className='mgnt-single-order'>
                            <td>
                                <span className={`status-mgnt-${o.status}`}>
                                    {o.status}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-name'>
                                    {o.user?.name}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-adress'>
                                    {o.adress}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-phone'>
                                    {o.phone}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-creation'>
                                    {new Date(o.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true //24h system
                                })}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-modification'>
                                    {new Date(o.updatedAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-total'>
                                    {o.total.toLocaleString()}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-view'>
                                    <Link to={`${o._id}`}>view</Link>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}