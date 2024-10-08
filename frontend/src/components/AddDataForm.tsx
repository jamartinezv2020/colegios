import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const AddDataForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error('Error al agregar datos');
      }
      alert('Datos agregados correctamente');
    } catch (error) {
      console.error('Error al agregar datos:', error);
      alert('Error al agregar datos');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Typography variant="h5" gutterBottom>
          Agregar Datos
        </Typography>
        <TextField
          fullWidth
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Agregar
        </Button>
      </Box>
    </Container>
  );
};

export default AddDataForm;

