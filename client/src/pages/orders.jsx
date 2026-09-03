import { useEffect } from "react"
import { getMyOrders } from "../services/api"
export function orders () {
    const cart = localStorage.getItem("cart")
    const [order,setOrder] = useState("")
    useEffect(()=>{
        const fetchOrdersWithId = (id) => {
        try{
            
            const data = getMyOrders(id)
            setOrder(data)
        }catch(error){
            return console.error(error || "Failed to fetch your order")
        }}
        fetchOrdersWithId(id)
    },[])
    //how can i put order onfos with each cart item ?
    //Order.findById(orderId).populate("items.product", "image");
    return(
        <div>
            <h1>Your prevuios orders </h1>
            {cart?.items.map((item) => {
                <div>
                    <h3 className="name">{item.name}</h3>
                    <p className="price">{item.price}</p>
                    <p className="quantity">{item.quantity}</p>
                </div>
            })}
            <p className="total">{cart.total}</p>
            <p className="phone">{cart.phone}</p>
            <p className="adress">{cart.adress}</p>
            <p className="status"><strong>{cart.status}</strong></p>
        </div>
    )
}