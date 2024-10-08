// src/components/AuthForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, recoverPassword } from '../../services/authService';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

/**
 * Componente de formulario de autenticación.
 * Permite a los usuarios iniciar sesión, registrarse y recuperar la contraseña,
 * además de iniciar sesión con Google.
 * 
 * @returns {JSX.Element} - El componente AuthForm.
 */
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register' | 'recover'>('login');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;

    if (mode === 'login') {
      success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        alert('Login failed');
      }
    } else if (mode === 'register') {
      success = await register(email, password, {}); // Pasando un objeto vacío como tercer argumento
      if (success) {
        alert('Registration successful. Please log in.');
        setMode('login');
      } else {
        alert('Registration failed');
      }
    } else if (mode === 'recover') {
      success = await recoverPassword(email);
      if (success) {
        alert('Password recovery email sent');
        setMode('login');
      } else {
        alert('Password recovery failed');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          {mode === 'login' && 'Login'}
          {mode === 'register' && 'Register'}
          {mode === 'recover' && 'Recover Password'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {mode !== 'recover' && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {mode === 'login' && 'Login'}
            {mode === 'register' && 'Register'}
            {mode === 'recover' && 'Send Recovery Email'}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
          >
            Login with Google
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {mode === 'login' ? (
              <>
                <Link href="#" variant="body2" onClick={() => setMode('register')}>
                  {"Don't have an account? Register"}
                </Link>
                <Link href="#" variant="body2" onClick={() => setMode('recover')}>
                  {"Forgot password?"}
                </Link>
              </>
            ) : (
              <Link href="#" variant="body2" onClick={() => setMode('login')}>
                {"Back to Login"}
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;