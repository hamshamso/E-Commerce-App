import { getMyOrders} from "../services/api"
import { useEffect,useState } from "react"
export function Orders () {
    const [order,setOrder] = useState([])
    useEffect(()=>{
        const fetchMyOrders = async() => {
            try{
                const token = localStorage.getItem("token")
                const data = await getMyOrders(token)
                setOrder(data.data)
            }catch(ademozi){
                console.error(ademozi || "Failed to fetchOrders")
            }
     }
     fetchMyOrders()
    },[])
    //how can i put order onfos with each cart item ?
    //Order.findById(orderId).populate("items.product", "image");
    return(
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
    )
}