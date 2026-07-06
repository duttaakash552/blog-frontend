import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Menu from './components/Menu'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
