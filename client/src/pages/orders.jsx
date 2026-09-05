import { getMyOrders} from "../services/api"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import "../styles/orderr.css"
export function Orders () {
    const [order,setOrder] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    
    useEffect(()=>{
        const fetchMyOrders = async() => {
            try{
                setLoading(true)
                const token = localStorage.getItem("token")
                const data = await getMyOrders(token)
                setOrder(data.data)
                setLoading(false)
            }catch(ademozi){
                setError(true)
                console.error(ademozi || "Failed to fetchOrders")
            }finally{
                setLoading(false)
            }}
        fetchMyOrders()
    },[])
    return(
        <div >
            {error && <h1 className="error" >Error!</h1>}
            {loading && <h1 className="loading" >loading...</h1>}
            {!error && !loading && (
                <div>
                    <div className="header">
                        <h1 >Your prevuios orders </h1>
                    </div>
                    
                    <div className="items">
                         <table>
                             <tr className="head">
                                <th>Status</th>
                                <th>Phone</th>
                                <th>Adress</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                                {order.map((o) => (
                                    <tr key={o._id} className="card">
                                        <td><p className={`status ${o.status}><strong>{o.status}</strong></p></td>
                                        <td><p className="phone"> 📞 Phone  : {o.phone}</p></td>
                                        <td><p className="adress">🏠 Ardess  : {o.adress}</p></td>
                                        <td><p className="total">💰 Total  : {o.total}</p></td>
                                        <td><Link className="view" to={`/orders/${o._id}`}> view more 🛒</Link></td>{/*Conditional rendering so if cansled = red , confirmed green ...*/}
                                    </tr> 
                                ))}
                        </table>
                    </div>
                </div>
            )}
        </div>
    )}
