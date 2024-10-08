import React, { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import LearningStyleForm from '../components/LearningStyleForm';
import LearningStyleResult from '../components/LearningStyleResult';

const LearningStylePage: React.FC = () => {
  const [learningStyle, setLearningStyle] = useState<string[]>([]);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Determinar Estilo de Aprendizaje
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <LearningStyleForm onResult={setLearningStyle} />
        </Paper>
        {learningStyle.length > 0 && (
          <Box mt={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <LearningStyleResult learningStyle={learningStyle} />
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LearningStylePage;

