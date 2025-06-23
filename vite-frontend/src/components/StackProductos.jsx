import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton, TextField, MenuItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const categorias = [
    'Verduras',
    'Frutas',
    'Carnes',
    'Pescado y mariscos',
    'Lacteos',
    'Bebidas',
    'Granos y cereales',
    'Salsas y condimentos',
    'Limpieza e higiene',
    'Congelados',
    'Empaquetados',
    'Otros'
]

const VITE_URL_RENDER = import.meta.env.VITE_URL_RENDER;

const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    const fetchProductos = async () => {
    try {
      const response = await fetch(`${VITE_URL_RENDER}/api/v1/productos`);

      if (!response.ok) throw new Error('Error en la respuesta');
      const data = await response.json();
      setProductos(data);

    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };   
  
  const handleBorrar = async (id) => {
    await fetch(`http://localhost:5000/api/v1/productos/${id}`, {
      method: 'DELETE',
    });
  
    fetchProductos(); 
  };

  useEffect(() => {
    fetchProductos(); 

    const interval = setInterval(() => {
      fetchProductos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
 ;
 const productosFiltrados = categoriaSeleccionada
  ? productos.filter((p) => p.categoria === categoriaSeleccionada)
  : [];
 
    return (
        <>
        <Box sx={{ textAlign: 'left', mt: 2, mb: 2 }}>
        <TextField select label="Filtrar por categoría" value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)} sx={{ minWidth: 550, mt: 4, ml: 8 }}>
          {categorias.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>


       <Box sx={{maxHeight: '440px', overflowY: 'auto', pr: 1, pb: 2 }}>
        {productosFiltrados.map((producto, index) => (
            <Card key={index} sx={{ ml: 8 , mt: 2, maxWidth: 500, p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: '#f0f4ff', maxHeight: 400, overflowY: 'auto', border: 2, borderColor: producto.stock_actual <= producto.stock_minimo ? 'red' : '#f0f4ff' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='h5' sx={{ color: 'black' }}>Detalles del producto</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Nombre: </b>{producto.nombre}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Unidad: </b>{producto.unidad}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Categoria: </b>{producto.categoria}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Stock actual: </b>{producto.stock_actual}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black'}}><b>Stock mínimo: </b>{producto.stock_minimo}</Typography>
                  </Box>
                  <IconButton onClick={() => handleBorrar(producto._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
        ))}
        </Box>
       {/* <Alert variant="filled" severity="warning" sx={{position: 'fixed', top: '30px',left: '15px',transform: 'translateY(550px)', zIndex: 1300, width: 'fit-content',}}>This is a warning Alert.</Alert> */}
        </Box>
      </>
    )
}
export default MostrarProductos;