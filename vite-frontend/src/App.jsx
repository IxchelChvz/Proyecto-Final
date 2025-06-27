import { useState } from 'react'
import './App.css'
import MenuBarra from '../layouts/Navbar'
import MostrarProductos from './components/StackProductos'
import AgregarProducto from './components/FormProducto'
import { Box } from '@mui/material'

function App() {
  const [recargar, setRecargar] = useState(false);
  const handleProductoAgregado = () => {
    setRecargar(prev => !prev);
  };
  return (
    <>
      <MenuBarra/>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} p={2}>
        <AgregarProducto onProductoAgregado={handleProductoAgregado} />
        <MostrarProductos recargar={recargar}/>
      </Box>
      
    </>
  )
}

export default App
