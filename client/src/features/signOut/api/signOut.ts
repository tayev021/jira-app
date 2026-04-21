import { api } from '../../../shared/api/api';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import { ApiError } from '../../../shared/utils/ApiError';
import { clearAccessToken } from '../../../shared/api/tokenStore';

export async function signOut(): Promise<void> {
  const response = await api('/auth/signout', { method: 'POST' });

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Invalid JSON response' });
  }

  const result = json as ApiResponse<null>;

  if (!result.success) {
    throw new ApiError(result.error);
  }

  clearAccessToken();
}
