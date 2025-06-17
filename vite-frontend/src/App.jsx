import { useState } from 'react'
import './App.css'
import Appbar from '../layouts/navBar'
import MostrarProductos from './components/StackProductos'
import AgregarProducto from './components/FormProducto'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Appbar/>
      <AgregarProducto/>
      <MostrarProductos/>
    </>
  )
}

export default App
