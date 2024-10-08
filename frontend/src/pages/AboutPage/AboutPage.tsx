import React, { useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, CardMedia, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implementar la lógica de búsqueda aquí, por ejemplo, redirigiendo a una página de resultados
    console.log('Buscando:', searchQuery);
    navigate(`/search?query=${searchQuery}`);
  };

  const handleJoinUsClick = () => {
    // Redirigir a otra página o realizar alguna acción
    navigate('/join');
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Typography variant="h3" gutterBottom>
        Tecnología Educativa Aplicada al Conocimiento
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="about-image.jpg" // Cambia por la imagen relevante
              alt="Imagen representativa"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Nuestra Misión
              </Typography>
              <Typography variant="body1" paragraph>
                Mejoramos la calidad de la educación inclusiva mediante
                inteligencia artificial y diseño universal del aprendizaje.
              </Typography>
              <Typography variant="body1" paragraph>
                Nuestro compromiso es proporcionar recursos y guías de
                aprendizaje que se adapten a diferentes estilos de aprendizaje,
                asegurando que todos los estudiantes puedan alcanzar su máximo
                potencial.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleJoinUsClick}>
                Únete a Nosotros
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;



