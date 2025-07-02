import { useState } from "react";
import { Typography, Button, TextField, Card, CardActions, CardContent, MenuItem, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const VITE_URL_RENDER = import.meta.env.VITE_URL_RENDER;

const unidades = [
    {
        value: 'Kilos',
        label: 'Kg',
    },
    {
        value: 'Litro',
        label: 'Lt',
    },
    {
        value: 'Paquetes',
        label: 'Paquetes',
    },
    {
        value: 'Botellas',
        label: 'Botellas',
    },
    {
        value: 'Cajas',
        label: 'Cajas',
    },
    
]
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

const AgregarProducto = ({ onProductoAgregado }) => {
    const [producto, setProducto] = useState({});
    const [nombre, setNombre] = useState('');
    const [unidad, setUnidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [actual, setActual] = useState('');
    const [minimo, setMinimo] = useState('');
    const [open, setOpen] = useState(false);


    const handleFormSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre: nombre,
      unidad: unidad,
      categoria: categoria,
      stock_actual: parseFloat(actual),
      stock_minimo: parseFloat(minimo),
      fecha_hora_registro: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${VITE_URL_RENDER}/api/v1/productos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(nuevoProducto),
        
      });

      if (!response.ok) throw new Error('Fallo al enviar el producto');

      setNombre('');
      setUnidad('');
      setCategoria('');
      setActual('');
      setMinimo('');
      setOpen(true);

    if (onProductoAgregado) {
      onProductoAgregado();
    }
    } catch (error) {
      console.log('Error al enviar el producto');
    }
  };

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
 const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
    return (
        <>
        <Card component="form" onSubmit={handleFormSubmit} sx={{ mt: 8, maxWidth: 500, p: 1, borderRadius: 3, boxShadow: 3, backgroundColor: '#f7f5f5', maxHeight: 500 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Registrar Producto</Typography>
          <CardContent>
            <TextField data-testid="input-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} label="Nombre" variant="outlined" fullWidth sx={{ mb: 2 }} required />
            <TextField data-testid="input-unidad" id="unidad" select label="Unidad"
             value={unidad} onChange={(e) => setUnidad(e.target.value)} variant="outlined" fullWidth sx={{ mb: 2 }} required>
            {unidades.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
            <TextField data-testid="input-categoria" select label='Categoria'fullWidth sx={{ mb: 2 }} value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                {categorias.map((categoria) => (
                    <MenuItem key={categoria} value={categoria}>
                        {categoria}
                    </MenuItem>
                ))}
            </TextField>
            <TextField data-testid="input-actual" value={actual} onChange={(e) => setActual(e.target.value)} label="Stock actual" variant="outlined" fullWidth sx={{ mb: 2 }} type="number" required />
            <TextField data-testid="input-minimo" value={minimo} onChange={(e) => setMinimo(e.target.value)} label="Stock minimo" variant="outlined" fullWidth sx={{ mb: 2 }} type="number" required />
          </CardContent>
          <CardActions>
            <Button data-testid="submit-submit" type="submit" variant="contained" size="small" sx={{}}>Registrar</Button>
          </CardActions>
        </Card>
        <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Producto registrado correctamente"
                action={action}
              />
        </>
    )
}
export default AgregarProducto;