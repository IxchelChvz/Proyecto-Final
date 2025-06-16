import { useState } from 'react'
import './App.css'
import Appbar from '../layouts/navBar'
import MostrarProductos from './components/StackProductos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Appbar/>
      <MostrarProductos/>
    </>
  )
}

export default App
