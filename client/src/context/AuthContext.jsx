import { createContext, useContext, useState, useEffect } from "react";

//create a shared storage container
const AuthContext= createContext()
                //provide user state
export function AuthProvider({children}){
    const [user,setUser] = useState(null)

    useEffect(()=>{
        const storedUser = localStorage.getItem("user")
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    },[])

    const login = (userData, token) => {
        localStorage.setItem("token", token)//data.data=email and password
        localStorage.setItem("user",JSON.stringify(userData))//localStorage stores only JSON
                     //user and token is the keys KEY           → VALUE
                     //so later localStorage.getItem("user")    //"user"    → {"name":"Ahmed","email":"ahmed@gmail.com"}
                                                                //"token"   → "eyJhbGciOi..."
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
    }
    const isuser = () => {
        if(!user){
            return false
        }
        return true
    }
    return (
        <AuthContext.Provider value={{user,isuser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}
