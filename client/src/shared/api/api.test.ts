import { vi } from 'vitest';
import { api } from './api';
import { getAccessToken } from './tokenStore';

const globalFetch = vi.fn();
vi.stubGlobal('fetch', globalFetch);

describe('shared/api/api', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should call fetchBase without refresh', async () => {
    globalFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

    const res = await api('/users');
    expect(res.status).toBe(200);
    expect(globalFetch).toHaveBeenCalledTimes(1);
  });

  it('should clear token if initial refresh fails', async () => {
    globalFetch.mockResolvedValueOnce(new Response(null, { status: 401 }));

    await expect(api('/users')).rejects.toThrow();

    expect(getAccessToken()).toBeNull();
  });
});
