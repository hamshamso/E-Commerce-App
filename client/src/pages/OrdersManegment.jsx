import '../styles/OrderManegment.module.css';
import { getDetailedOrders } from '../services/api.js';
import { useEffect, useState } from 'react';
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
            <table className="mgnt-table" style={{ all: 'revert', width: 'auto',color:'white' }}>
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
                                    {o.createdAt}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-modification'>
                                    {o.updatedAt}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-total'>
                                    {o.total}
                                </span>
                            </td>
                            <td>
                                <span className='mgnt-order-view'>
                                    view
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}