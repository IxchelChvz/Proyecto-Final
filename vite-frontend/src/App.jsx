import { useState } from 'react'
import './App.css'
import Appbar from '../layouts/navBar'
import MostrarProductos from './components/StackProductos'
import AgregarProducto from './components/FormProducto'
import { Box } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Appbar/>
      <Box display="flex" gap={2}>
        <AgregarProducto/>
        <MostrarProductos/>
      </Box>
      
    </>
  )
}

export default App
