import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);

    const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/productos');

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
 
    return (
        <>
        <Box sx={{ textAlign: 'left' }}>
        {productos.map((producto, index) => (
            <Card key={index} sx={{ mt: 2, maxWidth: 500, p: 3, borderRadius: 3, boxShadow: 3, boxShadow: 3, backgroundColor: '#f7f5f5', maxHeight: 400, overflowY: 'auto'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='h5' sx={{ color: 'black' }}>Detalles del producto</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Nombre: </b>{producto.nombre}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Unidad: </b>{producto.unidad}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Categoria: </b>{producto.categoria}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Stock actual: </b>{producto.stock_actual}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Stock mínimo: </b>{producto.stock_minimo}</Typography>
                  </Box>
                  <IconButton onClick={() => handleBorrar(producto._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
        ))}

        </Box>
        </>
    )
}
export default MostrarProductos;