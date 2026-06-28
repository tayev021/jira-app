import { vi } from 'vitest';
import { API_URL } from '../constants';
import { ApiError } from '../utils/ApiError';
import { fetchBase } from './fetchBase';

vi.stubGlobal('fetch', vi.fn());

describe('shared/api/fetchBase', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call fetch with default options', async () => {
    vi.mocked(fetch).mockResolvedValue({} as Response);

    await fetchBase('/users', {
      headers: {
        Authorization: 'Bearer access-token',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/users`,
      expect.objectContaining({
        credentials: 'include',
        headers: expect.objectContaining({
          Authorization: 'Bearer access-token',
          'Content-Type': 'application/json',
        }),
      })
    );
  });

  it('should pass request options', async () => {
    vi.mocked(fetch).mockResolvedValue({} as Response);

    await fetchBase('/users', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test' }),
    });

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/users`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Test' }),
      })
    );
  });

  it('should not set authorization header for refresh request', async () => {
    vi.mocked(fetch).mockResolvedValue({} as Response);

    await fetchBase('/auth/refresh', {
      isRefresh: true,
    });

    const options = vi.mocked(fetch).mock.calls[0][1];

    expect(options?.headers).not.toHaveProperty('Authorization');
  });

  it('should not set content-type for form data', async () => {
    vi.mocked(fetch).mockResolvedValue({} as Response);

    const formData = new FormData();

    await fetchBase('/upload', {
      method: 'POST',
      body: formData,
    });

    const options = vi.mocked(fetch).mock.calls[0][1];

    expect(options?.headers).not.toHaveProperty('Content-Type');
  });

  it('should merge custom headers', async () => {
    vi.mocked(fetch).mockResolvedValue({} as Response);

    await fetchBase('/users', {
      headers: {
        'X-Test': 'value',
        Authorization: 'Bearer access-token',
      },
    });

    const options = vi.mocked(fetch).mock.calls[0][1];

    expect(options?.headers).toMatchObject({
      'X-Test': 'value',
      Authorization: 'Bearer access-token',
    });
  });

  it('should allow overriding default headers', async () => {
    vi.mocked(fetch).mockResolvedValue({} as Response);

    await fetchBase('/users', {
      headers: {
        Authorization: 'Custom token',
      },
    });

    const options = vi.mocked(fetch).mock.calls[0][1];

    expect(options?.headers).toMatchObject({
      Authorization: 'Custom token',
    });
  });

  it('should throw ApiError on network error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network failed'));

    await expect(fetchBase('/users')).rejects.toThrow(ApiError);
    await expect(fetchBase('/users')).rejects.toMatchObject({
      code: 'ERROR',
      message: 'Network error',
    });
  });

  it('should return fetch response', async () => {
    const response = { ok: true } as Response;

    vi.mocked(fetch).mockResolvedValue(response);

    const result = await fetchBase('/users');

    expect(result).toBe(response);
  });
});
