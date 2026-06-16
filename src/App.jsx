import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'
// import Navbar from './components/Navbar.jsx'
import Card from './components/Card.jsx'
import AddCard from './components/AddCard.jsx'
import Like from './components/Like.jsx'
import OrderStore from './components/OrderStore.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home  />} />
        {/* <Route path='/' element={<Navbar/>} /> */}
        <Route path='/card/:id' element={<Card/>} />
        <Route path='/addcard' element={<AddCard/>} />
        <Route path='/like' element={<Like/>} />
        <Route path='/orderstore' element={<OrderStore/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App