import jwt from 'jsonwebtoken';
import { verifyRefreshToken } from '../../../shared/utils/verifyRefreshToken';

describe('TEST shared/utils/verifyRefreshToken', () => {
  beforeEach(() => {
    process.env.REFRESH_TOKEN_SECRET = 'test-secret';
  });

  it('should verify a valid refresh token', async () => {
    const payload = { id: '123' };
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!);
    const decoded = await verifyRefreshToken(token);

    expect(decoded).toMatchObject(payload);
  });
});
