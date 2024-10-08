// src/components/DashboardMetrics/DashboardMetrics.tsx

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Configuración de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardMetrics: React.FC = () => {
  // Datos de ejemplo para los gráficos
  const lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventas Mensuales',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true
      }
    ]
  };

  const barChartData = {
    labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
    datasets: [
      {
        label: 'Ventas por Producto',
        data: [12, 19, 3, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Métricas del Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ventas Mensuales
            </Typography>
            <Line data={lineChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ventas por Producto
            </Typography>
            <Bar data={barChartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardMetrics;
