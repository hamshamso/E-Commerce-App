import { useState } from "react";
import { useCart } from "../context/ProductContext";
import { Link } from "react-router-dom";
export function Checkout (){
    const {cart,sentOrder} = useCart()
    const [formData,setFormData] = useState({phone:"",adress:""})
    // Calculate cart total
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity,0)

    const hundlesubmit = (e) =>{
        e.preventDefault()

        const orderPayload = {
            phone: formData.phone,
            adress: formData.adress,
            items: cart,
            total: cartTotal,
        }
        sentOrder(orderPayload)
    }
    
     const hundlechange = (e) =>{
        setFormData(() => ({...formData, [e.target.name]: e.target.value}) )
    }

    return(
        <div>
            <form className="auth-form" onSubmit={hundlesubmit}>
                <h1>Enter your Phone number and adress to purchas the products</h1>

                <label htmlFor="phone">Phone number</label>
                <input id="phone" name="phone" type="number" value={cart.phone} onChange={hundlechange} required minLength={10}/>

                <label htmlFor="adress">Adress</label>
                <input id="adress" name="adress" type="text" value={cart.adress} onChange={hundlechange} required />

                <button type="submit" >
                    Buy
                </button>
                <p className="auth-switch">Buy new products? <Link to="/"> Buy</Link></p> {/*add cart icon*/}

             </form>
             <p>{cart.phone}</p>
             
        </div>
    )
}