// Ubicación: src/components/KuderQuestion.tsx

import React from 'react';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, Box } from '@mui/material';

interface KuderQuestionProps {
  question: string;
  options: string[];
  selectedOption: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const KuderQuestion: React.FC<KuderQuestionProps> = ({ question, options, selectedOption, onChange }) => {
  return (
    <FormControl component="fieldset" sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom align="left">
        {question}
      </Typography>
      <RadioGroup value={selectedOption} onChange={onChange}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={<Typography variant="body1" align="left">{option}</Typography>}
              sx={{ width: '100%', justifyContent: 'flex-start' }} // Asegura que las opciones estén justificadas a la izquierda
            />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};


export default KuderQuestion;

