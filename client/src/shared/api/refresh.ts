import { fetchBase } from './fetchBase';
import type { ApiResponse } from '../types/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { clearAccessToken, setAccessToken } from './tokenStore';

export async function refresh() {
  try {
    const response = await fetchBase('/auth/refresh');
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

    return result.data.accessToken;
  } catch (error) {
    clearAccessToken();
    throw error;
  }
}
