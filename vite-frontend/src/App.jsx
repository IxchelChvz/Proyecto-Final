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

  // Actualizar token cuando se loguee o desloguee
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  return (
    <BrowserRouter>
      <MenuBarra setToken={setToken} />
     <Routes>
  {/* Ruta pública para registro */}
  <Route
  path="/registro"
  element={token ? <Navigate to="/productos" /> : <RegistroUser setToken={setToken} />}
/>
<Route
  path="/"
  element={<Navigate to={token ? "/productos" : "/login"} />}
/>

  {/* Ruta pública para login */}
  <Route
    path="/login"
    element={token ? <Navigate to="/productos" /> : <LoginUser setToken={setToken} />}
  />

  {/* Ruta protegida para productos */}
  <Route
    path="/productos"
    element={token ? (
      <ProductosPage onProductoAgregado={handleProductoAgregado} recargar={recargar} />
    ) : (
      <Navigate to="/" />
    )}
  />

  {/* Para cualquier otra ruta redirigir a raíz (registro) */}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;
