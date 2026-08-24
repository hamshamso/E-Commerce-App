import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext()

export function CartProvider ({children}) {
    const [cart,setCart] = useState(() => {
        const stored = localStorage.setItem("cart")
        return stored ? JSON.parse(stored) : []
    })
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])

    const addToCart = (product, qty = 1 ) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item._id === product._id)
            if(existing) {
                return prevCart.map((item) => 
                    item._id === product._id
                        ? { ...item, quantity:item.quantity + qty}
                            : item
                ) 
            }
            return [ ...prevCart, { ...product, quantity:qty}]
        })
    }
    const removeFromCart = (productId => {
        
    })
}