import jwt, { VerifyErrors } from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload';

export function verifyTokenAsync(
  token: string,
  secret: string
): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error: VerifyErrors | null, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
}
