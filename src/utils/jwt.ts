import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE_TIME } from '../config/index';
import { UserAttributes } from '../database/models/userModel';

interface AuthenticatedRequest extends Request {
  id: string;
  iat?: number;
  exp?: number;
}

export const generateToken = (data: Partial<UserAttributes> | any) => {
  const payload = typeof data.toObject === 'function' ? data.toObject() : data;

  const tokenData = {
    id: payload.id, 
    username: payload.username,
    email: payload.email,
    role: payload.role,
  };

  const token = jwt.sign(tokenData, JWT_SECRET, {
    expiresIn: JWT_EXPIRE_TIME,
  });

  return token;
};

export const decodeToken: (token: string) => AuthenticatedRequest = (token: string) =>
  jwt.verify(token, JWT_SECRET) as AuthenticatedRequest;
