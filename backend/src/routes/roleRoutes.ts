// backend/src/routes/roleRoutes.ts

import { Router, Request, Response } from 'express';
import Role from '../models/Role'; // Asegúrate de que el modelo Role esté correctamente definido

const router = Router();

// Crear un nuevo rol
router.post('/', async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;
    
    // Validar que los campos no estén vacíos
    if (!nombre || !descripcion) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    // Crear el nuevo rol
    const nuevoRol = new Role({ nombre, descripcion });
    await nuevoRol.save();
    res.status(201).json(nuevoRol);
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).json({ message: 'Error al crear rol' });
  }
});

export default router;




