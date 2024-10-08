// src/theme.ts

import { createTheme } from '@mui/material/styles';

// Creación del tema personalizado con mejoras en los colores y tipografía
const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1', // Color azul más oscuro y moderno
      contrastText: '#ffffff', // Texto blanco en botones primarios
    },
    secondary: {
      main: '#c2185b', // Color rosa más atractivo
      contrastText: '#ffffff', // Texto blanco en botones secundarios
    },
    background: {
      default: '#fafafa', // Color de fondo más suave
      paper: '#ffffff', // Fondo blanco para papeles y tarjetas
    },
    text: {
      primary: '#333333', // Texto principal en color gris oscuro
      secondary: '#555555', // Texto secundario en gris medio
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#0d47a1', // Color azul primario para títulos
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#0d47a1',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#0d47a1',
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#555555',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Bordes redondeados en botones
          textTransform: 'none', // Texto en minúsculas
        },
        containedPrimary: {
          boxShadow: 'none', // Sin sombra en botones primarios
          '&:hover': {
            backgroundColor: '#1565c0', // Color azul más oscuro al pasar el ratón
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Sombra sutil al pasar el ratón
          },
        },
        containedSecondary: {
          boxShadow: 'none', // Sin sombra en botones secundarios
          '&:hover': {
            backgroundColor: '#ab003c', // Color rosa más oscuro al pasar el ratón
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Sombra sutil al pasar el ratón
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Bordes redondeados en tarjetas
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra suave en tarjetas
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Bordes redondeados en campos de texto
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: '16px', // Espacio inferior en textos
        },
      },
    },
  },
});

export default theme;


