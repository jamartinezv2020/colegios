import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRuta from './rutas/roleRuta';
import { verificarToken, verificarAdmin } from './middlewares/auth';
import connectDB from './db'; // Asegúrate de que la ruta a ./db esté correctamente definida
import authRoutes from './routes/auth';
import studentRoutes from './routes/students';
import passport from './config/passport'; // Importar la configuración de Passport

const app = express();

// Middleware de CORS para permitir solicitudes desde localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Conectar a la base de datos MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Salir del proceso con error en caso de falla
  });

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Middleware de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación con Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  (req: Request, res: Response) => {
    res.redirect('/dashboard'); // Redirige al dashboard o donde desees
  }
);

app.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

// Middleware de manejo de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

// Definir rutas para la autenticación y los estudiantes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Puerto para el servidor, usando el puerto definido en la variable de entorno PORT, o 5000 por defecto
const PORT = process.env.PORT ?? 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;

