import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext()

export function CartProvider ({children}) {
    //When React starts, it asks:
    //Do I already have a cart saved? if yes turns the stored string back into an array.
    const [cart,setCart] = useState(() => { //this way called lazy init
        const stored = localStorage.getItem("cart") 
        return stored ? JSON.parse(stored) : []
    //better then useState(JSON.parse(localStorage.getItem("cart"))) because : 1. If empty return Null not empty array like we want
    //                                                                         2. Runs evry render so less performance
    })

    //Save whenever the cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])
                              //qty = 1 default if user didn't provide a quantity
    const addToCart = (product, qty = 1 ) => {

        //When you pass a function to a state setter,
        //React automatically gives it the current state value as the argument.
        setCart((cart) => {//we can use setCart((cart) => { 
                                        //item is one product in prevCart array like this
                                                                                    //item._id = "1" 
                                                                                    //item.name: "Phone",
                                                                                    //item.quantity: 2
                                  //so find will check all items if one has a same id we will 
            const existing = cart.find((item) => item._id === product._id)
            if(existing) {
                //we uese map to reach the existing item / react when compare changes (he goes to refs) to decide whether update the UI (re-render) or no :
                                                             //const badUpdate = (arr) => { arr.push("x"); return arr; } returns same array and same ref so no re-render and cart still unchanged
                                                             //const goodUpdate = (arr) => { return [...arr, "x"]; } returns new array so new ref so re-render the cart
                return cart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity:item.quantity + qty}
                            : item
                ) 
            }
            //we create a new cart item if the product doesn't exist 
            return [ ...cart, { ...product, quantity:qty}]
        })
    }
    const clearCart = () => setCart([]);
    //const removeFromCart = (productId => {
    //    setCart((cart) => cart.filter((item) => item._id !== productId))
    //})

    return (
        <CartContext.Provider value={{addToCart,cart,clearCart}}>
            {children}
        </CartContext.Provider>    
    )   
}

export function useCart() {
        return useContext(CartContext)
}