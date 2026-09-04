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
function App() {
//Cart
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
      </Routes>
    </div>
    </>
  )
}

export default App
