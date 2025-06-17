import React, { use, useState } from "react";
import { Typography, Button, TextField, Card, CardActions, CardContent, MenuItem } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

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

const AgregarProducto = () => {
    const [producto, setProducto] = useState({});
    const [nombre, setNombre] = useState('');
    const [unidad, setUnidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [actual, setActual] = useState('');
    const [minimo, setMinimo] = useState('');


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
      const response = await fetch(`http://localhost:5000/api/v1/productos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });

      if (!response.ok) throw new Error('Fallo al enviar el producto');

      setNombre('');
      setUnidad('');
      setCategoria('');
      setActual('');
      setMinimo('');
      fetchClientes();
    } catch (error) {
      console.log('Error al enviar el producto');
    }
  };


    return (
        <>
        <Card component="form" onSubmit={handleFormSubmit} sx={{ mt: 6, maxWidth: 500, p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: '#f7f5f5' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Registrar Producto</Typography>
          <CardContent>
            <TextField value={nombre} onChange={(e) => setNombre(e.target.value)} label="Nombre" variant="outlined" fullWidth sx={{ mb: 2 }} required />
            <TextField id="unidad" select label="Unidad"
             value={unidad} onChange={(e) => setUnidad(e.target.value)} variant="outlined" fullWidth sx={{ mb: 2 }} required>
            {unidades.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
            <TextField select label='Categoria'fullWidth sx={{ mb: 2 }} value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                {categorias.map((categoria) => (
                    <MenuItem key={categoria} value={categoria}>
                        {categoria}
                    </MenuItem>
                ))}
            </TextField>
            <TextField value={actual} onChange={(e) => setActual(e.target.value)} label="Stock actual" variant="outlined" fullWidth sx={{ mb: 2 }} type="number" required />
            <TextField value={minimo} onChange={(e) => setMinimo(e.target.value)} label="Stock minimo" variant="outlined" fullWidth sx={{ mb: 2 }} type="number" required />
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" size="small">Registrar</Button>
          </CardActions>
        </Card>
        </>
    )
}
export default AgregarProducto;