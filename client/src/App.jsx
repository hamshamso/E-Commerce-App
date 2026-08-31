import Home from './pages/Home'
import './App.css';
import NavBar from './pages/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import {Route, Routes} from 'react-router-dom'
import { Cart } from './pages/Cart';
import { Checkout } from './pages/checkout';

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
      </Routes>
    </div>
    </>
  )
}

export default App
