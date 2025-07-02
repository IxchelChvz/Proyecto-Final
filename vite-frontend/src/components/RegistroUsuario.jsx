import { useState } from "react";
import { Button, Card, CardContent, CardActions, Typography, TextField, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const VITE_URL_RENDER = import.meta.env.VITE_URL_RENDER;

const RegistroUser = ({ setToken }) => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const nuevoUsuario = { nombre, contrasena };

    try {
      const response = await fetch(`${VITE_URL_RENDER}/api/v1/usuarios/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Fallo al enviar el usuario');

      localStorage.setItem('token', data.token);
      setToken(data.token);

      setNombre('');
      setContrasena('');
    } catch (error) {
      console.error('Error al enviar el usuario', error);
    }
  };
  return (
    <Stack direction="row" spacing={2} mt={10} justifyContent="center">
      <Card
        component="form"
        onSubmit={handleFormSubmit}
        sx={{ mt: 4, maxWidth: 400, p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: '#f9f9f9' }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Registrate
        </Typography>
        <CardContent>
          <TextField
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Inicia sesión aquí
            </Link>
          </Typography>
        </CardContent>
        
        <CardActions>
          <Button type="submit" variant="contained" size="small" fullWidth>
            Registrar
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default RegistroUser;
