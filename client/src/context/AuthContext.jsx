import { createContext, useContext, useState, useEffect } from "react";

const AuthContext= createContext()

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
    return (
        <AuthProvider.Provider value={{user,login,logout}}>
            {children}
        </AuthProvider.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}
