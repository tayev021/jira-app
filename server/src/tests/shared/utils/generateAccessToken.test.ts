import { generateAccessToken } from '../../../shared/utils/generateAccessToken';
import jwt from 'jsonwebtoken';

describe('TEST shared/utils/generateAccessToken', () => {
  beforeEach(() => {
    process.env.ACCESS_TOKEN_SECRET = 'test-secret';
    process.env.ACCESS_TOKEN_EXPIRES_IN_MINUTES = '15';
  });

  it('should generate a valid access token', () => {
    const payload = { id: '123' };
    const token = generateAccessToken(payload);

    expect(typeof token).toBe('string');

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    expect(decoded.id).toBe(payload.id);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
    expect(decoded.exp! - decoded.iat!).toBe(15 * 60);
  });

  it('should generate a valid access token without ACCESS_TOKEN_EXPIRES_IN_MINUTES', () => {
    process.env.ACCESS_TOKEN_EXPIRES_IN_MINUTES = '0';

    const payload = { id: '123' };
    const token = generateAccessToken(payload);

    expect(typeof token).toBe('string');

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    expect(decoded.id).toBe(payload.id);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
    expect(decoded.exp! - decoded.iat!).toBe(15 * 60);
  });
});
