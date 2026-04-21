import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload';

export function generateRefreshToken(payload: JwtPayload) {
  const secret = process.env.REFRESH_TOKEN_SECRET as string;
  const expiresInDays = Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) || 7;

  return jwt.sign(payload, secret, {
    expiresIn: expiresInDays * 24 * 60 * 60,
    algorithm: 'HS256',
  });
}
