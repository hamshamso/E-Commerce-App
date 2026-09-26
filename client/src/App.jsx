import Home from './pages/Home'
import './App.css';
import NavBar from './pages/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import {Route, Routes} from 'react-router-dom'
import { Cart } from './pages/Cart';
import { Checkout } from './pages/checkout';
import { Orders } from './pages/orders';
import {OrderDetails} from './pages/orderDetails'
import EditProduct from './pages/EditProduct';
import CreateProduct from './pages/CreateProduct';
import {OrderManegment} from './pages/OrdersManegment';
import { EditOrdersStatus } from './pages/EditOrdersStatus';
import {AdminRoute} from './context/AdminRoute'
import { AboutUs } from './pages/AboutUs';

function App() {
  return (
    <>
    <NavBar />
    <div className="app-shell">
  <main className="app-main">
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/about" element={<AboutUs />} />

      {/* Admin routes */}
      <Route
        path="/products/:id"
        element={
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        }
      />
      <Route
        path="/products/create"
        element={
          <AdminRoute>
            <CreateProduct />
          </AdminRoute>
        }
      />
      <Route
        path="/dashboard/orders"
        element={
          <AdminRoute>
            <OrderManegment />
          </AdminRoute>
        }
      />
      <Route
        path="/dashboard/orders/:id"
        element={
          <AdminRoute>
            <EditOrdersStatus />
          </AdminRoute>
        }
      />
    </Routes>
  </main>

    {/* Global Footer — sticks to bottom of viewport on short pages */}
        <footer className="about-footer">
          <p className="footer-brand">Velora</p>
          <p className="footer-tagline">Beautiful things, thoughtfully chosen.</p>
          <p className="footer-copy">© 2026 Velora</p>
        </footer>
      </div>
    </>
  )
}

export default App
