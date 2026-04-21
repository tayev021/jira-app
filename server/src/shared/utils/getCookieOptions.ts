import { CookieOptions } from 'express';

export function getCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: Number(process.env.COOKIE_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000,
  };
}
