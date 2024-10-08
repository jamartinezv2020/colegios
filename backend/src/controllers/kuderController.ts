// Ubicación: src/controllers/kuderController.ts

import { Request, Response } from 'express';
import KuderResult from '../models/KuderResult';
import jwt from 'jsonwebtoken';

export const saveKuderResult = async (req: Request, res: Response) => {
  try {
    const { userId, scores } = req.body;

    const newResult = new KuderResult({
      userId,
      scores,
    });

    await newResult.save();

    res.status(201).json({ message: 'Resultados guardados exitosamente', result: newResult });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar los resultados', error });
  }
};

export const getKuderResultsByUser = (req: Request, res: Response) => {
  try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
          return res.status(401).json({ message: 'No token provided' });
      }

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '') as { email: string };
      const userEmail = decodedToken.email;

      // Fetch results based on the userEmail
      // Replace the following line with your actual logic
      const results = {}; // Replace this with actual results

      return res.json(results);
  } catch (error) {
      console.error('Error in getKuderResultsByUser:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};