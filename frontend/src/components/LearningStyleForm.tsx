import React, { useState } from 'react';
import { Button, Typography, TextField, Grid } from '@mui/material';
import { classifyLearningStyle } from '../services/api';

interface LearningStyleFormProps {
  onResult: (learningStyle: string[]) => void;
}

const LearningStyleForm: React.FC<LearningStyleFormProps> = ({ onResult }) => {
  const [responses, setResponses] = useState<number[]>(new Array(44).fill(0));

  const handleChange = (index: number, value: number) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await classifyLearningStyle(responses);
    onResult(result.learningStyle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Classify Learning Style
      </Typography>
      <Grid container spacing={2}>
        {responses.map((response, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              label={`Question ${index + 1}`}
              type="number"
              value={response}
              onChange={(e) => handleChange(index, Number(e.target.value))}
              fullWidth
              required
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        Classify
      </Button>
    </form>
  );
};

export default LearningStyleForm;

