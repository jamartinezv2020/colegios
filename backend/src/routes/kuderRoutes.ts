// Ubicación: src/routes/kuderRoutes.ts

import express from 'express';
import { saveKuderResult, getKuderResultsByUser } from '../controllers/kuderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Rutas protegidas por autenticación
router.post('/save', authMiddleware, saveKuderResult);
router.get('/results/:userId', authMiddleware, getKuderResultsByUser);

export default router;
