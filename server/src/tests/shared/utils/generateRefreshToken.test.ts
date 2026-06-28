import { generateRefreshToken } from '../../../shared/utils/generateRefreshToken';
import jwt from 'jsonwebtoken';

describe('TEST shared/utils/generateRefreshToken', () => {
  beforeEach(() => {
    process.env.REFRESH_TOKEN_SECRET = 'test-secret';
    process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS = '7';
  });

  it('should generate a valid access token', () => {
    const payload = { id: '123' };
    const token = generateRefreshToken(payload);

    expect(typeof token).toBe('string');

    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    expect(decoded.id).toBe(payload.id);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
    expect(decoded.exp! - decoded.iat!).toBe(7 * 24 * 60 * 60);
  });

  it('should generate a valid access token without REFRESH_TOKEN_EXPIRES_IN_DAYS', () => {
    process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS = '0';

    const payload = { id: '123' };
    const token = generateRefreshToken(payload);

    expect(typeof token).toBe('string');

    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    expect(decoded.id).toBe(payload.id);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
    expect(decoded.exp! - decoded.iat!).toBe(7 * 24 * 60 * 60);
  });
});
