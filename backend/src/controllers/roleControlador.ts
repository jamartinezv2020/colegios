// controladores/roleControlador.ts
import { Request, Response } from 'express';
import Role from '../models/Role';

// Crear un nuevo rol
export const crearRole = async (req: Request, res: Response) => {
  try {
    const { nombreRol, estadoRol } = req.body;
    const nuevoRole = new Role({ nombreRol, estadoRol });
    const roleGuardado = await nuevoRole.save();
    res.status(201).json(roleGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear rol', error });
  }
};

// Obtener todos los roles o un rol específico
export const obtenerRoles = async (req: Request, res: Response) => {
  try {
    const roles = req.params.id ? await Role.findById(req.params.id) : await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener roles', error });
  }
};

// Actualizar un rol existente
export const actualizarRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const roleActualizado = await Role.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(roleActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar rol', error });
  }
};

// Eliminar un rol
export const eliminarRole = async (req: Request, res: Response) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar rol', error });
  }
};
