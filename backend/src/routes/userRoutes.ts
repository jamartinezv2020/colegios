// src/routes/userRoutes.ts
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import express from 'express';
import { getUserEmailHandler } from '../controllers/userController'; // Asegúrate de que la importación sea correcta
import User from '../models/User'; // Asegúrate de que el modelo User esté correctamente definido
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Ruta para obtener métricas de usuarios por granularidad
router.get('/metrics/:granularity', async (req, res) => {
  const { granularity } = req.params; // Obtener la granularidad de la ruta

  try {
    let users;

    // Verifica la granularidad y agrupa los usuarios en consecuencia
    if (granularity === 'daily') {
      // Agrupamos por día
      users = await User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Agrupamos por fecha exacta
            count: { $sum: 1 } // Contamos el número de usuarios por día
          }
        },
        {
          $sort: { _id: 1 } // Ordenamos por fecha
        }
      ]);
    } else if (granularity === 'monthly') {
      // Agrupamos por mes
      users = await User.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" }, // Agrupamos por mes
            count: { $sum: 1 } // Contamos el número de usuarios por mes
          }
        },
        {
          $sort: { _id: 1 } // Ordenamos por mes
        }
      ]);
    } else if (granularity === 'weekly') {
      // Agrupamos por semana
      users = await User.aggregate([
        {
          $group: {
            _id: { $isoWeek: "$createdAt" }, // Agrupamos por semana del año
            count: { $sum: 1 } // Contamos el número de usuarios por semana
          }
        },
        {
          $sort: { _id: 1 } // Ordenamos por semana
        }
      ]);
    } else if (granularity === 'yearly') {
      // Agrupamos por año
      users = await User.aggregate([
        {
          $group: {
            _id: { $year: "$createdAt" }, // Agrupamos por año
            count: { $sum: 1 } // Contamos el número de usuarios por año
          }
        },
        {
          $sort: { _id: 1 } // Ordenamos por año
        }
      ]);
    } else {
      // Si la granularidad no es válida, se responde con un error
      return res.status(400).json({ message: 'Granularidad no válida' });
    }

    // Crear etiquetas y valores basados en la granularidad
    const labels = granularity === 'daily'
      ? users.map(user => user._id) // Etiquetas por día
      : granularity === 'monthly'
        ? users.map(user => `Mes ${user._id}`) // Etiquetas por mes
        : granularity === 'weekly'
          ? users.map(user => `Semana ${user._id}`) // Etiquetas por semana
          : granularity === 'yearly'
            ? users.map(user => `Año ${user._id}`) // Etiquetas por año
            : []; // Granularidad no válida

    const values = users.map(user => user.count); // Valores correspondientes

    // Responder con las etiquetas y valores correspondientes
    res.json({ [granularity]: labels, values });
  } catch (error) {
    console.error('Error al obtener métricas de usuarios', error);
    res.status(500).json({ message: 'Error al obtener métricas de usuarios' });
  }
});

// Ruta para obtener usuarios por semana
router.get('/metrics/weekly', async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { $isoWeek: "$createdAt" }, // Agrupamos por semana del año
          count: { $sum: 1 } // Contamos el número de usuarios por semana
        }
      },
      {
        $sort: { _id: 1 } // Ordenamos por semana
      }
    ]);
    const weeks = users.map(user => `Semana ${user._id}`); // Etiquetas de semanas
    const values = users.map(user => user.count); // Valores correspondientes
    res.json({ weeks, values });
  } catch (error) {
    console.error('Error al obtener usuarios por semana', error);
    res.status(500).json({ error: 'Error al obtener usuarios por semana' });
  }
});

// Ruta para obtener usuarios por año
router.get('/metrics/yearly', async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { $year: "$createdAt" }, // Agrupamos por año
          count: { $sum: 1 } // Contamos el número de usuarios por año
        }
      },
      {
        $sort: { _id: 1 } // Ordenamos por año
      }
    ]);
    const years = users.map(user => `Año ${user._id}`); // Etiquetas de años
    const values = users.map(user => user.count); // Valores correspondientes
    res.json({ years, values });
  } catch (error) {
    console.error('Error al obtener usuarios por año', error);
    res.status(500).json({ error: 'Error al obtener usuarios por año' });
  }
});
// Simulación de un endpoint para obtener el correo electrónico del usuario
router.get('/auth/user/email', (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: 'Token is invalid' });
      }

      if (typeof decoded === 'object' && 'email' in decoded) {
          res.json({ email: decoded.email });
      } else {
          res.status(400).json({ message: 'Invalid token structure' });
      }
  });
});
// Ruta para obtener el correo electrónico del usuario
router.get('/user/email', authMiddleware, getUserEmailHandler);
// Otras rutas
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.get('/profile', authMiddleware, getUserProfile);

export default router;







