const API_BASE = "http://localhost:5000/api"


//Create "POST" a new user "text" parse it to JSON with stringify and send it to Backend 
//and check if evreythink is good 
export const registerUser = async (userData) =>{
    const res =await fetch (`${API_BASE}/auth/register`, {//front -> back
        method:"POST",
        headers:{"Content-Type": "application/json"},//to tell backend that we sending JSON data
        body: JSON.stringify(userData)              //parse TEXT into a JSON
    })
    const data = await res.json()   //read the response and convert it into an object 
    if(!res.ok) throw new Error(data.msg ||"Regestration failed")
        return data ;//the backend res (syccess/msg/data/token)
}

export const loginUser = async(credentials) => {
    const res = await fetch (`${API_BASE}/auth/login`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(credentials)              
    })
    const data = await res.json() 
    if(!res.ok) throw new Error(data.msg || "Login failed")
        return data ;
}
//GET request so no need to (method, headers, body)
export const getProducts  = async() => {
    const res = await fetch (`${API_BASE}/products`)
    const data = await res.json()
    //if the server isn't running : The promise itself rejects, throwing somthing like TypeError: Failed to fetch
    //So best practice here is try catch 
    if(!res.ok) throw new Error(data.msg || "Failed to fetch products")
    return data
}