import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
      };
    }
  }
}

const protect = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    req.user = { _id: decoded.id };
    next();
  } 
  
  catch (error: any) {
    console.error('Token verification failed:', error.message);

    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Not authorized, token expired' });
    } 
    
    else {
      res.status(401).json({ message: 'Not authorized, token invalid' });
    }

    return;
  }
};

export default protect;