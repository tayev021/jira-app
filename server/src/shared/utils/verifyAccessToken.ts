import { verifyTokenAsync } from './verifyTokenAsync';

export async function verifyAccessToken(accessToken: string) {
  return verifyTokenAsync(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as string
  );
}
