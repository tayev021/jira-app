import jwt, { VerifyErrors } from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload';

export async function verifyJwtAsync(token: string): Promise<JwtPayload> {
  const secret = process.env.SECRET as string;

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
