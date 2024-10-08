// src/pages/Analytics/Analytics.tsx

import React from 'react';
import { Typography, Box, Paper, Container } from '@mui/material';

const AnalyticsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 1200 }}>
          <Typography variant="h4" gutterBottom>
            Página de Análisis
          </Typography>
          <Typography variant="body1">
            Bienvenido a la sección de análisis. Aquí puedes visualizar las métricas y datos importantes relacionados con la aplicación.
          </Typography>
          {/* Agrega aquí los gráficos y elementos de análisis */}
        </Paper>
      </Box>
    </Container>
  );
};

export default AnalyticsPage;





