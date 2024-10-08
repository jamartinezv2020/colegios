// Ubicación: src/pages/RegisterForm.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Hook para navegación
  const { username, email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });
      console.log(res.data); // Mensaje de confirmación del servidor
      toast.success('Usuario registrado correctamente');
      setFormData({ username: '', email: '', password: '' }); // Limpiar el formulario después del registro exitoso
      
      // Redirigir al usuario a la página de login después de un registro exitoso
      navigate('/login');
    } catch (err: any) {
      console.error(err.response?.data);
      toast.error('Error al registrar usuario');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Registro de Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          label="Nombre de usuario"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Correo electrónico"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Contraseña"
          variant="outlined"
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Registrar
        </Button>
      </form>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate('/login')}
        sx={{ mt: 2 }}
        fullWidth
      >
        Volver al Login
      </Button>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default RegisterForm;


