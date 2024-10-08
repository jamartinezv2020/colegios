import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

interface LearningStyleResultProps {
  learningStyle: string[];
}

const LearningStyleResult: React.FC<LearningStyleResultProps> = ({ learningStyle }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Learning Style
      </Typography>
      <List>
        {learningStyle.map((style, index) => (
          <ListItem key={index}>
            <ListItemText primary={style} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LearningStyleResult;

