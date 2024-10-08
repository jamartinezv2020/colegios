declare module '../middleware/auth' {
    import { Request, Response, NextFunction } from 'express';
    
    const auth: (req: Request, res: Response, next: NextFunction) => void;
    export default auth;
  }
  