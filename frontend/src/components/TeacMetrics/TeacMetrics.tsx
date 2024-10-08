import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Slider, Tooltip } from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler);

const TeacMetrics: React.FC = () => {
  const [userStats, setUserStats] = useState<any>(null);
  const [granularity, setGranularity] = useState<'daily' | 'monthly'>('monthly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/metrics/${granularity}`);
        setUserStats(response.data);
      } catch (error) {
        console.error('Error al obtener datos', error);
        setUserStats({ error: 'Error al cargar los datos' });
      }
    };

    fetchData();
  }, [granularity]);

  const handleGranularityChange = (event: Event, newValue: number | number[]) => {
    setGranularity(newValue === 0 ? 'daily' : 'monthly');
  };

  if (userStats && userStats.error) {
    return <Typography variant="h6" align="center">{userStats.error}</Typography>;
  }

  if (!userStats) {
    return <Typography variant="h6" align="center">Cargando datos...</Typography>;
  }

  const labels = granularity === 'daily' ? userStats.dates || [] : userStats.months || [];
  const values = userStats.values || [];

  // Definir nombres de los meses en inglés
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Mapeo para los nombres de los meses
  const mappedLabels = granularity === 'monthly'
    ? labels.map((monthIndex: number) => monthNames[monthIndex] || '')
    : labels;

  console.log('Labels:', labels); // Agrega esta línea para depurar
  console.log('Mapped Labels:', mappedLabels); // Agrega esta línea para depurar

  const lineChartData = {
    labels: mappedLabels,
    datasets: [
      {
        label: 'Número de Usuarios Nuevos',
        data: values,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true
      }
    ]
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Métricas del Dashboard
      </Typography>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <Tooltip title={granularity === 'daily' ? 'Seleccionar Granularidad: Diario' : 'Seleccionar Granularidad: Mensual'}>
          <Slider
            value={granularity === 'daily' ? 0 : 1}
            onChange={handleGranularityChange}
            step={1}
            marks
            min={0}
            max={1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => (value === 0 ? 'Diario' : 'Mensual')}
            sx={{ width: 300 }}
          />
        </Tooltip>
      </Box>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={10} lg={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom align="center">
              Usuarios Nuevos
            </Typography>
            <Box sx={{ position: 'relative', height: '400px' }}>
              <Line 
                data={lineChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(tooltipItem) {
                          return `Usuarios Nuevos: ${tooltipItem.raw}`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value: string | number) {
                          if (granularity === 'monthly' && typeof value === 'number') {
                            return monthNames[value] || '';
                          }
                          return value;
                        }
                      }
                    },
                    y: {
                      beginAtZero: true,
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacMetrics;







