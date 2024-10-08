import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    (req as any).user = decoded;
    next();
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(401).json({ msg: 'Token is not valid' });
    } else {
      console.error('Unknown error occurred');
      res.status(500).json({ msg: 'Server error' });
    }
  }
// Verificar si el usuario tiene rol de administrador
export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado, no eres administrador' });
  }
};

export default auth;





