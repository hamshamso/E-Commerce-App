import { useContext,createContext } from "react";
import { useState,useEffect } from "react";

const OrderContext = createContext()

export const orderPovider({children}) {
    const [order,setOrder] = useState( () => {
        const stored = localStorage.getItem("order")
        return stored ? JSON.parse(stored) : []
    })
}

useEffect(() => {
    localStorage.setItem("order",JSON.stringify(order))
},[order])

const addOrder= () => {
    
}

export function useOrder(){
    return useContext(OrderContext)
}