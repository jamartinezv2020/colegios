// src/pages/Settings/Settings.tsx

import React from 'react';
import { Typography, Box, Grid, Switch, FormControlLabel, Paper } from '@mui/material';

const SettingsPage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Configuración
      </Typography>
      <Box mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Preferencias de Usuario
              </Typography>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Activar notificaciones"
              />
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Modo oscuro"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Seguridad
              </Typography>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Autenticación de dos factores"
              />
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Habilitar inicio de sesión biométrico"
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SettingsPage;



