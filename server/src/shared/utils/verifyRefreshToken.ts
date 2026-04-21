import { verifyTokenAsync } from './verifyTokenAsync';

export async function verifyRefreshToken(refreshToken: string) {
  return verifyTokenAsync(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );
}
