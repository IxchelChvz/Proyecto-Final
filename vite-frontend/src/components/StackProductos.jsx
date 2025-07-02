import { useState, useEffect } from 'react';
import { 
  Card, CardContent, Typography, Box, 
  IconButton, TextField, MenuItem, Snackbar, 
  Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions, 
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const categorias = [
  { value: 'Verduras', label: 'Verduras 🥦' },
  { value: 'Frutas', label: 'Frutas 🍎' },
  { value: 'Carnes', label: 'Carnes 🥩' },
  { value: 'Pescado y mariscos', label: 'Pescado y mariscos 🐟' },
  { value: 'Lacteos', label: 'Lácteos 🧀' },
  { value: 'Bebidas', label: 'Bebidas 🥤' },
  { value: 'Granos y cereales', label: 'Granos y cereales 🌾' },
  { value: 'Salsas y condimentos', label: 'Salsas y condimentos 🧂' },
  { value: 'Limpieza e higiene', label: 'Limpieza e higiene 🧼' },
  { value: 'Congelados', label: 'Congelados ❄️' },
  { value: 'Empaquetados', label: 'Empaquetados 📦' },
  { value: 'Otros', label: 'Otros 🛒' }
];

const VITE_URL_RENDER = import.meta.env.VITE_URL_RENDER;

const MostrarProductos = ({ recargar }) => {
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
   

    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);


    const confirmarEliminacion = (producto) => {
      setProductoAEliminar(producto);
      setOpenDialog(true);
    };
    
    const handleConfirmarBorrar = async () => {
  if (productoAEliminar) {
    const token = localStorage.getItem('token');
    await fetch(`${VITE_URL_RENDER}/api/v1/productos/${productoAEliminar._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    fetchProductos();
    setOpenSnackbar(true);
  }
  setOpenDialog(false);
  setProductoAEliminar(null);
};

 async function fetchProductos() {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token en localStorage');

    const response = await fetch(`${VITE_URL_RENDER}/api/v1/productos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const text = await response.text(); // leer como texto para debug
    console.log('Respuesta cruda:', text);

    if (!response.ok) {
      console.error('Error en respuesta:', response.status, text);
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
      throw new Error(`Error en la respuesta: ${response.status}`);
    }

    const data = JSON.parse(text);

    if (!Array.isArray(data)) throw new Error('La respuesta no es un array');

    setProductos(data);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}

  useEffect(() => {
    fetchProductos(); 

    const interval = setInterval(() => {
      fetchProductos();
    }, 5000);

    return () => clearInterval(interval);
  }, [recargar]);
 ;
const productosFiltrados = categoriaSeleccionada && Array.isArray(productos)
  ? productos.filter(p => p.categoria === categoriaSeleccionada)
  : Array.isArray(productos)
    ? productos
    : [];

const actualizarStock = async (productoId, nuevoStock) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token');

    const res = await fetch(`${VITE_URL_RENDER}/api/v1/productos/${productoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ stock_actual: nuevoStock }),
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
      throw new Error('Error al actualizar el stock');
    }

    fetchProductos();
  } catch (err) {
    console.error(err);
  }
};


    return (
        <>
        <Box sx={{ textAlign: 'left', mt: -2, mb: 1 }}>
        <TextField data-testid="select-categoria" select label="Filtrar por categoría" value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)} sx={{ minWidth: 550, mt: 4, ml: 8 }}>
          {categorias.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
          ))}
        </TextField>


       <Box sx={{maxHeight: '440px', overflowY: 'auto', pr: 1, pb: 2 }}>
        {productosFiltrados.map((producto, index) => (
            <Card data-testid='Piña' key={index} sx={{ ml: 8 , mt: 2, maxWidth: 500, p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: '#f0f4ff', border: 2, borderColor: producto.stock_actual <= producto.stock_minimo ? 'red' : '#f0f4ff' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='h5' sx={{ color: 'black' }}>Detalles del producto</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Nombre: </b>{producto.nombre}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Unidad: </b>{producto.unidad}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Categoria: </b>{producto.categoria}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black'}}><b>Stock mínimo: </b>{producto.stock_minimo}</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'black' }}><b>Stock actual: </b>{producto.stock_actual}</Typography>
                  </Box>
                  <IconButton onClick={() => confirmarEliminacion(producto)} color="error">
                    <DeleteIcon sx={{ fontSize: 30 }}/>
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 9, mt: 1, mb: -3 }}>
                <IconButton
                  onClick={() => actualizarStock(producto._id, producto.stock_actual - 1)}
                  color="primary"
                  disabled={producto.stock_actual <= 0}
                >
                  <RemoveIcon sx={{ fontSize: 35 }} />
                </IconButton>

                <Typography sx={{ mt: 1 }} variant="h6">{producto.stock_actual}</Typography>

                <IconButton
                  onClick={() => actualizarStock(producto._id, producto.stock_actual + 1)} 
                  color="primary"
                >
                  <AddIcon sx={{ fontSize: 35 }} />
                </IconButton>
              </Box>
              </CardContent>
            </Card>
        ))}
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>¿Eliminar producto?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar "{productoAEliminar?.nombre}"?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button onClick={handleConfirmarBorrar} color="error">Eliminar</Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            message="Producto eliminado con éxito"
          />
        </Box>
      </>
    )
}
export default MostrarProductos;