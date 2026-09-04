import { useState, useEffect} from "react"; 
import { getOredersWithId } from "../services/api";
import { useParams } from "react-router-dom";
import "../styles/ordersDetails.css"
export function OrderDetails(){
    const [order,setOrder] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const { id } = useParams();//Extract ID from URL (Route)
    useEffect(()=>{
        const fetchMyOrders = async() => {
            try{
                setLoading(true)
                const token = localStorage.getItem("token")
                const data = await getOredersWithId(token,id)
                setOrder(data.data || data);
                setLoading(false)
            }catch(ademozi){
                setError(true)
                console.error(ademozi || "Failed to fetchOrders")
            }finally{
                setLoading(false)
            }}
        fetchMyOrders()
    },[id])
    return(
        <div >
            {error && <h1 className="error" >Error!</h1>}
            {loading && <h1 className="loading" >loading...</h1>}
            {!error && !loading && (
                order.items.map((item) => (
                    <div key={item._id || item.id} className="product-card">
                        <div className="product">
                            <div className="img-section">
                                <img src={  item.product?.image }
                                 alt={item.name} />
                            </div>
                            <div className="product-details">
                                <p className="category">{item.product?.category}</p>
                                <h1 className="name">Name : {item.name}</h1>
                                <p className="price">Price : {item.price}</p>
                                <p className="quantity">Quantity : {item.quantity}</p>
                                {order.status == 'pending' && (
                                    <div className="cansel-section">
                                        <button className="cansel-button">Cansel order</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
                ))
            )}

        </div>
    )
}