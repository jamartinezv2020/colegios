// src/pages/JoinUsPage.tsx
import React from 'react';
import { Container, Typography, Box, Paper, Button, TextField } from '@mui/material';

const JoinUsPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={5} mb={5}>
        <Typography variant="h4" gutterBottom>
          Únete a Nosotros
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            Estamos emocionados de que consideres unirte a nuestro equipo. Completa el formulario a continuación para comenzar el proceso.
          </Typography>
          <form>
            <TextField 
              fullWidth 
              label="Nombre Completo" 
              variant="outlined" 
              margin="normal" 
            />
            <TextField 
              fullWidth 
              label="Correo Electrónico" 
              type="email" 
              variant="outlined" 
              margin="normal" 
            />
            <TextField 
              fullWidth 
              label="Motivación para unirse" 
              multiline 
              rows={4} 
              variant="outlined" 
              margin="normal" 
            />
            <Box mt={3}>
              <Button variant="contained" color="primary" type="submit">
                Enviar
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default JoinUsPage;

