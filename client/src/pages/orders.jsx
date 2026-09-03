import { getMyOrders} from "../services/api"
import { useEffect,useState } from "react"

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
            {error && <h1>{error}</h1>}
            {loading && <h1>loading</h1>}
            {!error && !loading && (
                <div>
                    <h1>Your prevuios orders </h1>
                    {order.map((o) => (
                        <div className="item-card" key={o._id}>
                            <p className="total">{o.total}</p>
                            <p className="phone">{o.phone}</p>
                            <p className="adress">{o.adress}</p>
                            <p className="status"><strong>{o.status}</strong></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )}