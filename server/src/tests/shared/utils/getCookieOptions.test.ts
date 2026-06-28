import { getCookieOptions } from '../../../shared/utils/getCookieOptions';

describe('TEST shared/utils/getCookieOptions', () => {
  it('should generate a valid cookie options for production', () => {
    process.env.NODE_ENV = 'production';
    process.env.COOKIE_EXPIRES_IN_DAYS = '7';

    const cookieOptions = getCookieOptions();

    expect(cookieOptions).toEqual({
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  });

  it('should generate a valid cookie options for development', () => {
    process.env.NODE_ENV = 'development';
    process.env.COOKIE_EXPIRES_IN_DAYS = '7';

    const cookieOptions = getCookieOptions();

    expect(cookieOptions).toEqual({
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  });
});
