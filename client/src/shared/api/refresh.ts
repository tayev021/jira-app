import { fetchBase } from './fetchBase';
import { ApiError } from '../utils/ApiError';
import type { ApiResponse } from '../types/ApiResponse';
import { setAccessToken } from './tokenStore';

export async function refresh() {
  const response = await fetchBase('/auth/refresh', { isRefresh: true });

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Invalid JSON response' });
  }

  const result = json as ApiResponse<{ accessToken: string }>;

  if (!result.success) {
    throw new ApiError(result.error);
  }

  setAccessToken(result.data.accessToken);
}
