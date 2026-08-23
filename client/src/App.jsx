import Home from './pages/Home'
import './App.css';
import NavBar from './pages/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import {Route, Routes} from 'react-router-dom'
function App() {

  return (
    <>
    <NavBar />
    <div className='pages'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
