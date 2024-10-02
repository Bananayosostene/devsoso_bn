import { Response, Request, NextFunction } from 'express';
import { decodeToken } from '../utils/jwt';
import { getUserByIdHelper } from '../services/userService'; 
import { UserDocument } from '../database/models/userModel';
import UserModel from "../database/models/userModel";
import { error } from 'console';

export interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authToken = req.headers.authorization
    if (!authToken) {
      res.status(401).json({ message: 'Please login' });
      return;
    }

    const token = authToken.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'No access token found' });
      return;
    }

    const payload = await decodeToken(token);
    if (!payload?.id) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const user = await getUserByIdHelper(payload.id); 
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    (req as AuthenticatedRequest).user = user;
    next(); 
  } catch (error:any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
    return;
  }
};


export const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    if (!authenticatedReq.user) {
      return res.status(401).json({
        message: "Unauthorized - User not authenticated",
      });
    }
  
    const user = await UserModel.findById(authenticatedReq.user._id);

    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({
        message: "Forbidden - User does not have admin privileges",
      });
    }
  } catch (error:any) {
    res.status(500).json({
      message: "Internal Server Error",
      data: null,
      theErrorIs: error.message,
    });
  }
};

 