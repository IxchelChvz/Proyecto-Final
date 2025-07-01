import {useState} from "react";
import {Button, Card, CardContent, CardActions, Typography, TextField, Stack} from '@mui/material';

const RegistroUser = (onUsuarioAgregado) => {

    const [usuario, setUsuario] = useState({});
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
   


    const handleFormSubmit = async (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre: nombre,
      contrasena: contrasena,
    };

    try {
      const response = await fetch(`${VITE_URL_RENDER}/api/v1/usuarios/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
        
      });

      if (!response.ok) throw new Error('Fallo al enviar el usuario');

      setNombre('');
      setContrasena('');

    if (onUsuarioAgregado) {
      onUsuarioAgregado();
    }
    } catch (error) {
      console.log('Error al enviar el usuario');
    }
  };

    return (
        <>
            <Stack direction="row" spacing={2} mt={10} justifyContent="center">
            <Card onSubmit={handleFormSubmit} component="form" sx={{ mt: 4, maxWidth: 400, p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Registrate</Typography>
                <CardContent>
                    <TextField value={nombre} onChange={(e) => setNombre(e.target.value)} label="Nombre de usuario" variant="outlined" fullWidth sx={{ mb: 2 }} required />
                    <TextField value={contrasena} onChange={(e) => setContrasena(e.target.value)} label="Contraseña" variant="outlined" fullWidth sx={{ mb: 2 }} required />
                </CardContent>
                <CardActions>
                    <Button type="submit" variant="contained" size="small" fullWidth>Registrar</Button>
                </CardActions>
            </Card>
            </Stack>
        </>
    )
};

export default RegistroUser;