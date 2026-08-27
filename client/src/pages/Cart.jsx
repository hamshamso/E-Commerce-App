import { useCart } from "../context/ProductContext";
import { useState,useEffect } from "react";
import { getProducts } from "../services/api";

const [products,setProducts] = useState([])
const [cart,setCart] = useState([])
const [error,setError] = useState(false)
const [loading,setLoading] = useState(true)
export function Cart(){

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const data = await getProducts();
            setProducts(data.data);
          } catch (e) {
            console.error(e);
            setError(e.message);
          } finally {
            setLoading(false);
          }
        };
        fetchProducts();
      }, []);
      return(
        <div className="error">
            {error && <div><span>Failed to load your cart</span></div>}
            {loading && <div><span>Loading</span></div>}
            {!error && !loading && 
            <div>
                
            </div>}
        </div>
      )
}