import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload';

export function signToken(payload: JwtPayload) {
  const secret = process.env.JWT_SECRET as string;
  const expiresInHours = Number(process.env.EXPIRES_IN_HOURS) || 1;

  return jwt.sign(payload, secret, {
    expiresIn: expiresInHours * 60 * 60,
    algorithm: 'HS256',
  });
}
