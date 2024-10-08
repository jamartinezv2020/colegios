// Ubicación: src/components/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useAuth } from '../AuthContext';
import RegisterForm from './RegisterForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register' | 'recover'>('login');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      try {
        const res = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
          login(data.token);
          toast.success('Login successful!');
          navigate('/dashboard');
        } else {
          toast.error('Login failed: ' + data.message);
        }
      } catch (error: any) {
        toast.error('Login failed: ' + error.message);
      }
    } else if (mode === 'register') {
      try {
        const res = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
          toast.success('Registration successful! Redirecting to login page...');
          setMode('login');
          navigate('/login');  // Redirigir después de cambiar el modo
        } else {
          toast.error('Registration failed: ' + data.message);
        }
      } catch (error: any) {
        toast.error('Registration failed: ' + error.message);
      }
    } else if (mode === 'recover') {
      try {
        const res = await fetch('http://localhost:5000/api/users/recover', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          toast.success('Password recovery email sent');
          setMode('login');
        } else {
          toast.error('Failed to send recovery email');
        }
      } catch (error: any) {
        toast.error('Failed to send recovery email: ' + error.message);
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
        {mode === 'register' ? (
          <RegisterForm />
        ) : (
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {mode === 'login' && 'Login'}
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
        )}
      </Box>
    </Container>
  );
};

export default LoginForm;

