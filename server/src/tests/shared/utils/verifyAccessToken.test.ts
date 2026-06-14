import jwt from 'jsonwebtoken';
import { verifyAccessToken } from '../../../shared/utils/verifyAccessToken';

describe('TEST shared/utils/verifyAccessToken', () => {
  beforeEach(() => {
    process.env.ACCESS_TOKEN_SECRET = 'test-secret';
  });

  it('should verify a valid access token', async () => {
    const payload = { id: '123' };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!);
    const decoded = await verifyAccessToken(token);

    expect(decoded).toMatchObject(payload);
  });
});
