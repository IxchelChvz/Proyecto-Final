import {
  AppBar, Toolbar, Typography, Button, IconButton
} from '@mui/material';

const Appbar = () => {
    return(
        <>
        <AppBar primary={"light"}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ChefStock 
          </Typography>
        </Toolbar>
      </AppBar>
        </>
    )
}
export default Appbar;