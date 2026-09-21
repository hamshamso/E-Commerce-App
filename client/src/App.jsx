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

function App() {
  return (
    <>
    <NavBar />
    <div className='pages'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/orders/:id' element={<OrderDetails/>}/>

        <Route 
                path='/products/:id' 
                element={
                    <AdminRoute>
                        <EditProduct />
                    </AdminRoute>
                } 
            /> 
        <Route 
              path='/products/create' 
              element={
                <AdminRoute>
                  <CreateProduct/>
                </AdminRoute>}/>
        <Route 
              path='/dashboard/orders' 
              element={
                <AdminRoute>
                  <OrderManegment/>
                </AdminRoute>}/>
        <Route 
              path='/dashboard/orders/:id' 
              element={
                <AdminRoute>
                  <EditOrdersStatus/>
                </AdminRoute>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
