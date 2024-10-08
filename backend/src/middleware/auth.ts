// src/middlewares/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Configura las variables de entorno desde el archivo .env
dotenv.config();

// Definición de la interfaz para la solicitud autenticada que extiende de Request
interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload; // Propiedad opcional que contiene la carga útil decodificada del JWT
}

/**
 * Middleware para verificar si un usuario está autenticado.
 * Este middleware verifica la presencia de un token JWT en el encabezado de la solicitud,
 * y lo decodifica para agregar la información del usuario a la solicitud.
 * 
 * @param req - La solicitud HTTP que contiene el token en el encabezado.
 * @param res - La respuesta HTTP que se enviará al cliente.
 * @param next - La función que permite continuar con el siguiente middleware.
 */
const verificarToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Obtiene el token del encabezado 'x-auth-token'
  const token = req.header('x-auth-token');

  // Verifica si el token no está presente
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Decodifica el token utilizando el secreto JWT y agrega el usuario a la solicitud
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    req.user = decoded; 
    next(); // Continúa con el siguiente middleware
  } catch (err) {
    // Captura los errores en la verificación del token
    if (err instanceof Error) {
      console.error(err.message);
      res.status(401).json({ msg: 'Token is not valid' });
    } else {
      console.error('Unknown error occurred');
      res.status(500).json({ msg: 'Server error' });
    }
  }
};

/**
 * Middleware para verificar si un usuario tiene el rol de administrador.
 * Este middleware se utiliza en rutas que requieren permisos de administrador.
 * 
 * @param req - La solicitud HTTP que contiene la información del usuario.
 * @param res - La respuesta HTTP que se enviará al cliente.
 * @param next - La función que permite continuar con el siguiente middleware.
 */
export const verificarAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Verifica si el usuario está autenticado y tiene el rol de administrador
  if (req.user && req.user.role === 'admin') {
    next(); // Continúa con el siguiente middleware
  } else {
    // Si no tiene permisos de administrador, envía un mensaje de acceso denegado
    res.status(403).json({ mensaje: 'Acceso denegado, no eres administrador' });
  }
};

export default verificarToken; // Exporta verificarToken como valor por defecto
