import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MenuBarra from '../layouts/Navbar';
import MostrarProductos from './components/StackProductos';
import AgregarProducto from './components/FormProducto';
import LoginUser from './components/LoginUsuario';

import { Box } from '@mui/material';
import RegistroUser from './components/RegistroUsuario';

function ProductosPage({ onProductoAgregado, recargar }) {
  return (
    <Box display="flex" gap={2}> 
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} sx={{ml:15}}>
        <AgregarProducto onProductoAgregado={onProductoAgregado} />
        <MostrarProductos recargar={recargar} />
      </Box>
    </Box>
  );
}

function App() {
  const [recargar, setRecargar] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleProductoAgregado = () => {
    setRecargar(prev => !prev);
  };

  
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  return (
    <BrowserRouter>
      <MenuBarra setToken={setToken} />
    <Routes>

  <Route
    path="/login"
    element={token ? <Navigate to="/productos" /> : <LoginUser setToken={setToken} />}
  />

 
  <Route
    path="/register"
    element={token ? <Navigate to="/productos" /> : <RegistroUser setToken={setToken} />}
  />

 
  <Route
    path="/"
    element={<Navigate to={token ? "/productos" : "/login"} />}
  />


  <Route
    path="/productos"
    element={token ? (
      <ProductosPage onProductoAgregado={handleProductoAgregado} recargar={recargar} />
    ) : (
      <Navigate to="/login" />
    )}
  />

  {/* Ruta no encontrada */}
  <Route path="*" element={<h1>Página no encontrada</h1>} />
</Routes>

    </BrowserRouter>
  );
}

export default App;
