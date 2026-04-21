import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload';

export function generateAccessToken(payload: JwtPayload) {
  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  const expiresInMinutes =
    Number(process.env.ACCESS_TOKEN_EXPIRES_IN_MINUTES) || 15;

  return jwt.sign(payload, secret, {
    expiresIn: expiresInMinutes * 60,
    algorithm: 'HS256',
  });
}
