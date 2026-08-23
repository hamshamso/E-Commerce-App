import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import "../styles/auth.css"
import {useAuth} from "../context/AuthContext"
function Register () {
    const [formData,setFormData] = useState({name:"",email:"",password:"",phone:""})
    const [error,setError] = useState("")//we use throw error(msg:...) so we put inside them (error.msg)
    const [loading,setLoading] = useState(false)
    const {login} = useAuth()
    const navigate = useNavigate()       //when we you res.json(msg:"") we use in the font const data = res.json() 
                                                                                         //setError(data.msg)
    const handleChange = (e) =>{
        setFormData({ ...formData,[e.target.name]: e.target.value})
    //if user types email=hamchamco7@gmail.com thene.target.name=email and 
    //e.target.value=hamchamco7@gmail.com
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError("")
        setLoading(true)
        try{
            //backend returns 
              //data
              //  ├── success
              //  ├── msg
              //  ├── data
              //  │   ├── name
              //  │   └── email
              //  └── token
            const data = await registerUser(formData)//api call
            //localStorage.setItem("token", data.token)   
            //localStorage.setItem("user", JSON.stringify(data.data)) 
            login(data.data,data.token)         
            navigate("/")
        }catch(error){
            console.error(error.message)
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    return(
        <div>
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Create an account</h1>
                {error ? <p className="auth-error">{error}</p> : null }
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required minLength={6} />

                <button type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
                </button>

                <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
             </form>
        </div>
     );
}

export default Register;