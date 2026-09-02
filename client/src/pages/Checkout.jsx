import { useState } from "react";
import { useCart } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { createOrder } from "../services/api";

export function Checkout (){
    const {cart,clearCart} = useCart()
    const [formData,setFormData] = useState({phone:"",adress:""})
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [submit,setSubmit] = useState(false)
    // Calculate cart total
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity,0)

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const hundlesubmit = async (e) =>{
        
        e.preventDefault()
        setError(false)
        setLoading(true)
        try{
        const token = localStorage.getItem("token");
        const items = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));
        const orderPayload = {
        phone: formData.phone,
        adress: formData.adress,
        items,
      };
       await createOrder(orderPayload,token)
       setSubmit(true)
       setFormData({ phone: "", adress: "" })
       clearCart()
       return false
    }catch(e){
        console.error(e)
        setError(true)
    }finally{
        setLoading(false)
    }}
    return (
        <div>
            {error && <h1>Error</h1> }
            {loading && <h1>Loading...</h1>}

            {!submit ? 
                <div>
                    <form className="auth-form" onSubmit={hundlesubmit}>
                        <h1>Enter your Phone number and adress to purchas the products</h1>

                        <label htmlFor="phone">Phone number</label>
                        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required minLength={10}/>

                        <label htmlFor="adress">Adress</label>
                        <input id="adress" name="adress" type="text" value={formData.adress} onChange={handleChange} required />

                        <button type="submit" >
                            Buy
                        </button>
                        <p className="auth-switch">Buy new products? <Link to="/"> Buy</Link></p> {/*add cart icon*/}

                    </form>
                    {cartTotal > 0 && <p>TOTAL :{cartTotal}</p>}
                </div>
                :
                <div>
                    <h1>Your order has been successfuly requested</h1>
                    <Link to='/'>Home</Link>
                </div>
            }
        </div>
    )
}