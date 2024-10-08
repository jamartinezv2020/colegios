import { createTheme } from '@mui/material/styles';

// Define tu paleta de colores
const theme = createTheme({
  palette: {
    primary: {
      main: '#0C7ABE', // Color azul claro
    },
    secondary: {
      main: '#FFB74D', // Color naranja cálido
    },
    background: {
      default: '#F5F5F5', // Fondo gris claro
    },
    text: {
      primary: '#212121', // Texto oscuro
      secondary: '#757575', // Texto secundario
    },
  },
});

export default theme;
