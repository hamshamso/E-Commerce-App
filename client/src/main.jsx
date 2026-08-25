import ReactDOM from 'react-dom/client'
import { CartProvider } from "./context/CartContext.jsx";
import { BrowserRouter } from 'react-router-dom' 
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
    </AuthProvider>
  </BrowserRouter>

)