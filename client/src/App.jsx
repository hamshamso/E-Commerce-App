import Home from './pages/Home'
import './App.css';
import NavBar from './pages/NavBar'
import {Route, Routes} from 'react-router-dom'
function App() {

  return (
    <>
    <NavBar />
    <div className='pages'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' />
        <Route path='/register'/>
      </Routes>
    </div>
    </>
  )
}

export default App
