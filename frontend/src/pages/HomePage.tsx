import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Tecnología Educativa Aplicada al Conocimiento

        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Avanzando hacia la Inclusión Total.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/students"
            >
              Ver Estudiantes
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              color="primary" 
              component={Link} 
              to="/courses"
            >
              Ver Cursos
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Gestión de Estudiantes
              </Typography>
              <Typography variant="body1">
                Añade, edita y elimina información de los estudiantes.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Gestión de Cursos
              </Typography>
              <Typography variant="body1">
                Administra los cursos disponibles y la asignación de estudiantes.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Reportes y Análisis
              </Typography>
              <Typography variant="body1">
                Genera reportes y visualiza análisis detallados.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;

