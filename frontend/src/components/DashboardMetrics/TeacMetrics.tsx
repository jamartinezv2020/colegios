// src/components/TeacMetrics.tsx
import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios para Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Mapeo de los nombres de los meses
const monthNames: { [key: string]: string } = {
  'Mes 1': 'Enero',
  'Mes 2': 'Febrero',
  'Mes 3': 'Marzo',
  'Mes 4': 'Abril',
  'Mes 5': 'Mayo',
  'Mes 6': 'Junio',
  'Mes 7': 'Julio',
  'Mes 8': 'Agosto',
  'Mes 9': 'Septiembre',
  'Mes 10': 'Octubre',
  'Mes 11': 'Noviembre',
  'Mes 12': 'Diciembre',
};

type Granularity = 'yearly' | 'monthly' | 'weekly' | 'daily';
type ChartType = 'line' | 'bar' | 'pie';

const TeacMetrics: React.FC = () => {
  const [granularity, setGranularity] = useState<Granularity>('yearly');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/metrics/${granularity}`);
        const data = response.data;

        // Mapeo de nombres de meses si la granularidad es mensual
        const labels = granularity === 'monthly'
          ? data[granularity].map((month: string) => monthNames[month] || month)
          : data[granularity];

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Número de usuarios',
              data: data.values,
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error al cargar los datos', error);
      }
    };

    fetchData();
  }, [granularity]);

  const handleGranularityChange = (event: React.SyntheticEvent, newValue: Granularity) => {
    setGranularity(newValue);
  };

  const handleChartTypeChange = (event: React.SyntheticEvent, newValue: ChartType) => {
    setChartType(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Métricas de Usuarios
      </Typography>

      {/* Tabs para seleccionar la granularidad */}
      <Tabs value={granularity} onChange={handleGranularityChange} sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tab label="Anual" value="yearly" />
        <Tab label="Mensual" value="monthly" />
        <Tab label="Semanal" value="weekly" />
        <Tab label="Diario" value="daily" />
      </Tabs>

      {/* Contenedor para el gráfico y la selección de tipo de gráfico */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, // Ajuste para pantallas pequeñas
          alignItems: 'center', 
          width: '100%', 
          height: { xs: 'auto', sm: '500px' }, // Ajuste de altura
          mt: 2,
          overflow: 'hidden' // Evita el desbordamiento
        }}
      >
        {/* Renderizado del gráfico */}
        <Box 
          sx={{ 
            flex: 1, 
            position: 'relative', 
            height: '100%', 
            maxWidth: { xs: '100%', sm: '75%' }, // Ajuste del ancho
            mb: { xs: 2, sm: 0 } // Margen inferior en pantallas pequeñas
          }}
        >
          {chartType === 'line' && chartData && <Line data={chartData} options={{ maintainAspectRatio: false }} />}
          {chartType === 'bar' && chartData && <Bar data={chartData} options={{ maintainAspectRatio: false }} />}
          {chartType === 'pie' && chartData && <Pie data={chartData} options={{ maintainAspectRatio: false }} />}
        </Box>

        {/* Selección de tipo de gráfico */}
        <Box 
          sx={{ 
            display: { xs: 'none', sm: 'flex' }, // Ocultar en pantallas pequeñas
            flexDirection: 'column', 
            alignItems: 'center',
            minWidth: 100, 
            borderLeft: 1, 
            borderColor: 'divider', 
            height: '100%',
            px: 1 // Espaciado horizontal
          }}
        >
          <Tabs 
            orientation="vertical" 
            value={chartType} 
            onChange={handleChartTypeChange} 
            sx={{ 
              height: '100%', 
              borderColor: 'divider' 
            }}
          >
            <Tab label="Línea" value="line" />
            <Tab label="Barras" value="bar" />
            <Tab label="Circular" value="pie" />
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacMetrics;
























