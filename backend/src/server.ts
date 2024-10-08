// Importaciones necesarias para el servidor y middleware
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Importaciones de rutas y middleware de autenticación y autorización
import userRouter from './routes/userRoutes'; // Ruta para el manejo de usuarios
import auth, { verificarAdmin } from './middleware/auth'; // Middleware de autenticación y autorización
import roleRoutes from './routes/roleRoutes'; // Ruta para el manejo de roles
import kuderRoutes from './routes/kuderRoutes'; // Ruta para el manejo de cuestionarios Kuder
import questionnaireRoutes from './routes/questionnaire'; // Ruta para el manejo de cuestionarios generales
import studentRoutes from './routes/studentRoutes'; // Ruta para el manejo de estudiantes

// Configuración de variables de entorno
dotenv.config();

// Inicialización de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las peticiones y permitir CORS
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/roles', roleRoutes); // Rutas para la gestión de roles
app.use('/api/questionnaire', questionnaireRoutes); // Rutas para cuestionarios generales
app.use('/api/users', userRouter); // Rutas para usuarios
app.use('/api/kuder', kuderRoutes); // Rutas para cuestionarios Kuder
app.use('/api/students', studentRoutes); // Rutas para estudiantes

// Rutas protegidas por autenticación y autorización
app.use('/ruta-protegida', auth, verificarAdmin, (req: Request, res: Response) => {
  res.send('Ruta protegida para administradores');
});

// Ruta protegida para administradores
app.get('/api/admin', [auth, verificarAdmin], (req: Request, res: Response) => {
  res.send('Bienvenido, administrador.');
});

// Ruta de prueba para asegurarse de que el servidor funciona
app.get('/', (req: Request, res: Response) => {
  res.send('API funcionando');
});

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bd_feldersilverman', {
   
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB', err));

// Inicialización del servidor en el puerto configurado o 5000 por defecto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
