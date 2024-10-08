// Ubicación: src/pages/KuderResultsPage.tsx

import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { getKuderResultsByUser } from '../services/kuderService';

const KuderResultsPage: React.FC = () => {
  const [results, setResults] = useState<{ [key: string]: number } | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      const userId = 'id_del_usuario'; // Aquí obtendrás el ID del usuario
      const response = await getKuderResultsByUser(userId);
      setResults(response.data[0]?.scores || null);
    };

    fetchResults();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Resultados del Cuestionario de Kuder
      </Typography>
      {results ? (
        Object.keys(results).map((key, index) => (
          <Typography key={index} variant="body1">
            {key}: {results[key]}
          </Typography>
        ))
      ) : (
        <Typography variant="body1">
          No se encontraron resultados.
        </Typography>
      )}
    </Box>
  );
};

export default KuderResultsPage;
