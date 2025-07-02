import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, CardContent, CardActions, Typography, TextField, Stack } from '@mui/material';

const VITE_URL_RENDER = import.meta.env.VITE_URL_RENDER;

const LoginUser = ({ setToken }) => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  async function login(nombre, contrasena) {
    try {
      const res = await fetch(`${VITE_URL_RENDER}/api/v1/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, contrasena }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);   // Actualiza el token en App.jsx
        alert('Login exitoso');
        navigate('/productos'); // Redirige a productos
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error en la conexión al servidor');
      console.error(error);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !contrasena) {
      alert('Por favor, completa todos los campos');
      return;
    }
    login(nombre, contrasena);
  };

  return (
    <Stack direction="row" spacing={2} mt={10} justifyContent="center">
      <Card
        component="form"
        onSubmit={handleFormSubmit}
        sx={{ mt: 4, maxWidth: 400, p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: '#f9f9f9' }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center'}}>
          Iniciar sesión
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
            ¿Aún no tienes una cuenta?{' '}
           <Link to="/registro" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Registrate
            </Link>
          </Typography>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" size="small" fullWidth>
            Entrar
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default LoginUser;
