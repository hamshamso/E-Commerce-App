import { useState } from "react";
import { useCart } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { createOrder } from "../services/api";

export function Checkout (){
    const {cart} = useCart()
    const [formData,setFormData] = useState({phone:"",adress:""})
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    // Calculate cart total
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity,0)

    const hundlesubmit = (e) =>{
        try{e.preventDefault()
        setLoading(true)
        const orderPayload = {
            phone: formData.phone,
            adress: formData.adress,
            items: cart,
            total: cartTotal,
        }
        createOrder(orderPayload)
    }catch(e){
        console.error(e)
        setError(true)
    }finally{
        setLoading(false)
    }}

    {error && <h1>Error</h1>}
    {loading && <h1>Loading...</h1>}

return (
    <div>
            <form className="auth-form" onSubmit={hundlesubmit}>
                <h1>Enter your Phone number and adress to purchas the products</h1>

                <label htmlFor="phone">Phone number</label>
                <input id="phone" name="phone" type="number" value={formData.phone} required minLength={10}/>

                <label htmlFor="adress">Adress</label>
                <input id="adress" name="adress" type="text" value={formData.adress} required />

                <button type="submit" >
                    Buy
                </button>
                <p className="auth-switch">Buy new products? <Link to="/"> Buy</Link></p> {/*add cart icon*/}

             </form>
             <p>{cart.phone}</p>
             
        </div>
)}