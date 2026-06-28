import { clearAccessToken, getAccessToken, setAccessToken } from './tokenStore';

describe('shared/api/tokenStore', () => {
  it('should get access token', async () => {
    const token = getAccessToken();

    expect(token).toBeNull();
  });

  it('should set access token', async () => {
    setAccessToken('new token');

    const token = getAccessToken();

    expect(token).toBe('new token');
  });

  it('should clear access token', async () => {
    setAccessToken('new token');

    const token = getAccessToken();

    expect(token).toBe('new token');

    clearAccessToken();

    const newToken = getAccessToken();

    expect(newToken).toBeNull();
  });
});
