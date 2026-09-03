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
            {error && <h1 className="header" >{error}</h1>}
            {loading && <h1 className="header" >loading...</h1>}
            {!error && !loading && (
                <div>
                    <div className="header">
                        <h1 >Your prevuios orders </h1>
                    </div>
                    
                    <div className="items">
                    {order.map((o) => (
                        <div key={o._id} className="card">
                            <div className="item-card" >
                                <p className="phone"> 📞 Phone  : {o.phone}</p>
                                <p className="adress">🏠 Ardess  : {o.adress}</p>
                                <p className="total">💰 Total  : {o.total}</p>
                            </div>
                            <div className="bottom-card">
                                    <button className="view-more">
                                        <Link to={`/orders/${o._id}`}> view more 🛒</Link>
                                    </button>
                                    <p className="status"><strong>{o.status}</strong></p>
                            </div>
                        </div>
                        
                    ))}
                    </div>
                </div>
            )}
        </div>
    )}