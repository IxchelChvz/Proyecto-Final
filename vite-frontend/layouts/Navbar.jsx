import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

const VITE_URL_RENDER = import.meta.env.VITE_URL_RENDER;

const MenuBarra = ({ setToken }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
        setToken(null);
        if (location.pathname !== '/login' && location.pathname !== '/register') {
          navigate('/login');
        }
        return;
      }
        const res = await fetch(`${VITE_URL_RENDER}/api/v1/productos`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          setToken(null);
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        if (!res.ok) {
          console.error('Error en la respuesta del servidor:', res.status);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          setProductos([]);
        }
      } catch (err) {
        console.error('Error al obtener productos', err);
      }
    };

    fetchProductos();
  }, [setToken, navigate]);

  const productosBajoStock = Array.isArray(productos)
    ? productos.filter((p) => p.stock_actual <= p.stock_minimo)
    : [];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const isProductosPage = location.pathname === '/productos';

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Título centrado */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          ChefStock 👨‍🍳
        </Typography>

        {/* Icono de notificaciones solo en /productos */}
        {isProductosPage && (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen} aria-label="notificaciones">
              <Badge badgeContent={productosBajoStock.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Menu desplegable de notificaciones */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
          </>
        )}

        {/* Solo en /productos mostramos icono hamburguesa para drawer */}
        {isProductosPage && (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={toggleDrawer(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemText primary="Cerrar sesión" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MenuBarra;
