import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard'; // Ajusta la ruta según tu estructura de carpetas
import { Container, Box, Paper, Typography, Button } from '@mui/material';

// Componente Home que representa la página principal
const Home: React.FC = () => {
  return (
    <Dashboard> {/* Utilizamos el componente Dashboard para envolver el contenido */}
      <Container maxWidth="md">
        <Box mt={5} mb={5}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Bienvenido a la Página Principal
            </Typography>
            <Typography variant="body1" gutterBottom>
              Esta es la sección principal de tu aplicación donde puedes agregar más contenido relevante.
            </Typography>
            <Typography variant="body2" paragraph>
              Aquí puedes incluir información sobre las características de tu aplicación, instrucciones de uso, o cualquier otro contenido importante que desees compartir con tus usuarios.
            </Typography>
            <Button variant="contained" color="primary">
              Comenzar
            </Button>
          </Paper>
        </Box>
      </Container>
    </Dashboard>
  );
};

export default Home;



