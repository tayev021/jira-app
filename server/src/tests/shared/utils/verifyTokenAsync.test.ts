import jwt from 'jsonwebtoken';
import { verifyTokenAsync } from '../../../shared/utils/verifyTokenAsync';

describe('TEST shared/utils/verifyTokenAsync', () => {
  it('should verify a valid token', async () => {
    const payload = { id: '123' };
    const token = jwt.sign(payload, 'test-secret');
    const decoded = await verifyTokenAsync(token, 'test-secret');

    expect(decoded).toMatchObject(payload);
  });

  it('should verify a invalid token', async () => {
    const payload = { id: '123' };
    const token = jwt.sign({ id: '321' }, 'test-secret');
    const decoded = await verifyTokenAsync(token, 'test-secret');

    expect(decoded).not.toMatchObject(payload);
  });
});
