import {useState} from "react"
import {createNewproduct} from "../services/api.js"
import {useNavigate} from "react-router-dom";
import '../styles/createproduct.css'

function CreateProduct(){
    const [error,setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [formdata, setFormdata] = useState({
        image:"",name:"",price:"",quantity:"",category:""
    })

    const CATEGORIES = ["Bags", "Watches", "Clothes", "Accessories","Parfum","Phones","Cars","Other","Tools"];
    const handleChange = (e) => {
        setFormdata(prev => ({...prev,[e.target.name]: e.target.value}));
    };
    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        const token = localStorage.getItem("token")
        try {
            const payload = {
                ...formdata,
                price: Number(formdata.price),
                quantity: Number(formdata.quantity)
            };
           await createNewproduct(payload,token)
           navigate('/')
        }catch (ademozi) {
           console.error(ademozi.message)
           setError(ademozi.message)
        }finally{
          setLoading(false)
          setFormdata({name:"",price:"",quantity:"",category:""})          
        }
    }
    return(
        <div>
            <form className="create-product-form" onSubmit={handleSubmit}>
                <h1>Add new product to your store</h1>
                {error ? <p className="error">{error}</p> : null }

                <label htmlFor="image">Image</label>
                <input id="image" name="image" type="text" placeholder="Please provide a URL" value={formdata.image} onChange={handleChange} required />

                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={formdata.name} onChange={handleChange} required />

                <label htmlFor="price">price</label>
                <input id="price" name="price" type="text" min="0" value={formdata.price} onChange={handleChange} required />

                <label htmlFor="quantity">Quantity</label>
                <input id="quantity" name="quantity" type="number" min="0" value={formdata.quantity} onChange={handleChange} required />

                <label htmlFor="category">Category</label>
                <select
                id="category" 
                    name="category" 
                    value={formdata.category} 
                    onChange={handleChange} 
                    required
                >
                    <option value="" disabled> Select Category </option>
                    {CATEGORIES.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button type="submit" disabled={loading}>
                {loading ? "Adding product..." : "Add product"}
                </button>
            </form>
        </div>
    )
}
export default CreateProduct;