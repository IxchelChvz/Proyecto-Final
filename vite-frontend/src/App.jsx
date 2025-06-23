import { useState } from 'react'
import './App.css'
import MenuBarra from '../layouts/Navbar'
import MostrarProductos from './components/StackProductos'
import AgregarProducto from './components/FormProducto'
import { Box } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MenuBarra/>
      <Box display="flex" gap={2}>
        <AgregarProducto/>
        <MostrarProductos/>
      </Box>
      
    </>
  )
}

export default App
