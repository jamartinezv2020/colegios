import React, { useState } from 'react';
import { Student } from '../models/Student';
import { TextField, Button, Grid } from '@mui/material';

interface StudentFormProps {
  onSubmit: (student: { name: string; email: string; learningStyle: string[] }) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [learningStyle, setLearningStyle] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, learningStyle });
    setName('');
    setEmail('');
    setLearningStyle([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Learning Styles (comma separated)"
            value={learningStyle.join(', ')}
            onChange={(e) => setLearningStyle(e.target.value.split(',').map(style => style.trim()))}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Student
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentForm;




