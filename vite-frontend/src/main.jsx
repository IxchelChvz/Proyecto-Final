import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { themeOptions } from './Theme.jsx';

const theme = createTheme(themeOptions);

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>,
  </ThemeProvider>
)
