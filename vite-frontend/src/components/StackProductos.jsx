import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box} from '@mui/material';


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

  useEffect(() => {
    fetchProductos(); 

    const interval = setInterval(() => {
      fetchProductos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

    return (
        <>
        <Box>
        {productos.map((producto, index) => (
            <Card key={index} sx={{ mt: 1, width: 500, p: 1, borderRadius: 3, boxShadow: 3, backgroundColor: '#f7f5f5', maxHeight: 400, overflowY: 'auto'}}>
                <CardContent>
                    <Typography variant='h5' sx={{'color':'black'}}>Detalles del producto</Typography>
                    <Typography variant='subtitle1' sx={{'color':'black'}}><b>Nombre: </b>{producto.nombre}</Typography>
                    <Typography variant='subtitle1' sx={{'color':'black'}}><b>Cantidad: </b>{producto.unidad}</Typography>
                    <Typography variant='subtitle1' sx={{'color':'black'}}><b>Categoria: </b>{producto.categoria}</Typography>
                    <Typography variant='subtitle1' sx={{'color':'black'}}><b>Stock actual: </b>{producto.stock_actual}</Typography>
                    <Typography variant='subtitle1' sx={{'color':'black'}}><b>Stock minimo: </b>{producto.minimo}</Typography>
                </CardContent>
            </Card>
        ))}

        </Box>
        </>
    )
}
export default MostrarProductos;