import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/auth.css"
import { useAuth } from "../context/AuthContext";

function Login(){
    const [formData,setFormData] = useState({email:"",password:""})
    const [error,setError] = useState("")
    const [loading,setloading] = useState(false)
    const navigate = useNavigate()
    const {login} = useAuth()
    
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e)=> {
        e.preventDefault()
        setError("")
        setloading(true)
        try{
            const data = await loginUser(formData)
            //localStorage.setItem("token",data.token)
            //localStorage.setItem("user",JSON.stringify(data.data))
            login(data.data, data.token)//All the localStorage codes is here
            navigate("/")
        }catch(error){
            console.error(error)
            setError(error.message)
        }finally{
            setloading(false)
        }
    }

    return(
        <div>
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Log In into your Account</h1>
                {error ? <p className="auth-error">{error}</p> : null }

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required minLength={6} />

                <button type="submit" disabled={loading}>
                {loading ? "Log In into your account..." : "Log In"}
                </button>

                <p className="auth-switch">Don't have an account? <Link to="/register">Register</Link></p>
             </form>
        </div>
    )
}
export default Login