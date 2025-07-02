import { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Badge, Menu, MenuItem, Button, Box
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const VITE_URL_RENDER = import.meta.env.VITE_URL_RENDER;

const MenuBarra = ({ setToken }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${VITE_URL_RENDER}/api/v1/productos`);
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error('Error al obtener productos', err);
      }
    };

    fetchProductos();
  }, []);

  const productosBajoStock = productos.filter(p => p.stock_actual <= p.stock_minimo);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); // Invalida sesión
    navigate('/'); // Redirige a login/registro
  };

  return (
    <AppBar >
      <Toolbar>
        <Typography   variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          ChefStock 👨‍🍳
        </Typography>
       
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Badge badgeContent={productosBajoStock.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {productosBajoStock.length > 0 ? (
            productosBajoStock.map((producto) => (
              <MenuItem key={producto._id}>
                {producto.nombre} ({producto.stock_actual})⬇️
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Todo en orden</MenuItem>
          )}
        </Menu>

        <Button color="inherit" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBarra;
