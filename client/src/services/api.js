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
export const getProductById = async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`)
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.msg || `Failed to fetch product ${id}`)
    }
    return data
}
export const createOrder = async (orderData,token) => {
    const res = await fetch(`${API_BASE}/orders`,{
        method:"POST",
        headers:{"Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.msg || "Failed to create order")
        return data 
}

//All of the rest is 100% human after i learned well
//only admin
export const getOrders = async () => {
    const res = await fetch(`${API_BASE}/orders`)
    const data = await res.json()
    if(!res.ok) throw new Error(data.msg || "Failed to fetch orders")
    return data
}
//Users and thier orders
export const getMyOrders = async (token) => {
    const res = await fetch(`${API_BASE}/orders/my`,{
        headers:{"Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
        },})
    const data = await res.json()
    if(!res.ok) throw new Error(data.msg || "Failed to fetch your order")
    return data
}
//Users and thier order
export const getOredersWithId = async (token, id) => {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Failed to fetch your order");
  return data;
};

//admin only API
export  const updateOrderStatus = async (id,status) => {
    const res = await fetch(`${API_BASE}/${id}/status`,{
        method : "PUT",
        body:JSON.stringify({status})
    })
    const data = await res.json()
    if(!res.ok){throw new Error(data.msg || "Failed to update status")}
    return data
}
//100%
export const RemoveProductFromOrder = async (orderId,productsId,token) => {
    const res = await fetch(`${API_BASE}/orders/${orderId}/${productsId}`,{
        method:'DELETE',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await res.json()
    return data
}
//admin only API
export const UpdateProduct = async (product,productId,token)=>{
    const res = await fetch(`${API_BASE}/products/${productId}`,{
        method:'PATCH',
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(product)
    })
    const data = await res.json()
    if(!res.ok){
       throw new Error(data.msg || "Failed to update products")
    }
    return data
}
export const deleteProduct = async(id,token) => {
     const res = await fetch(`${API_BASE}/products/${id}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    const data = await res.json()
    if(!res.ok){
       throw new Error(data.msg || "Failed to delete the product")
    }
    return data
}
//admin only API
export const createNewproduct = async(product,token) =>{
    const res = await fetch(`${API_BASE}/products/create`,{
        method:"POST",
        headers:{"Content-Type":"application/json",
                "Authorization":`Bearer ${token}`},
        body: JSON.stringify(product)
    })

    const data = await res.json() 
    if(!res.ok) throw new Error(data.msg || "Product creation failed")
        return data ;
}
//aadmin only API
export const getDetailedOrders = async(token) => {
    const res = await fetch(`${API_BASE}/dashboard/orders`,{
        method:"GET",
        headers:{"Content-type":"application/json",
                "Authorization":`Bearer ${token}`}
    })

    const data = await res.json()
    if(!res.ok){
        throw new Error(data.msg || "Failed to fetch Detailed orders")
    }
    return data
}
export const getOrderById = async(token,id) =>{
    const res = await fetch(`${API_BASE}/dashboard/orders/${id}`,{
        method:"GET",
        headers:{"Content-type":"application/json",
                 "Authorization":`Bearer ${token}`} 
    })
    const data = res.json()
    if(!res.ok){
        throw new Error(res.msg || "Failed to fetch order by ID")
    }
    return data
}
export const confirmOrder = async(token,id) =>{
    const res = await fetch(`${API_BASE}/dashboard/orders/${id}/confirm`,{
        method:"PUT",
        headers:{"Content-type":"application/json",
                "Authorization":`Bearer ${token}`}
    })
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.msg || "Failed to confirm order")
    }
    return data
}
export const canselOrder = async(token,id) =>{
    const res = await fetch(`${API_BASE}/dashboard/orders/${id}/cansel`,{
        method:"PUT",
        headers:{"Content-type":"application/json",
                "Authorization":`Bearer ${token}`}
    })
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.msg || "Failed to cansel order")
    }
    return data
}
export const hideOrder =async(token,id) => {
    const res = await fetch(`${API_BASE}/dashoard/orders/${id}/hide`,{
        method:"PUT",
        headers:{"Content-type":"application/json",
            "Authorization":`Bearer ${token}`}
        }
    )
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.msg || "Failed to hide order")
    }
    return data
}

