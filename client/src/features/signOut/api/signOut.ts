import { API_URL } from '../../../shared/constants';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import { ApiError } from '../../../shared/utils/ApiError';

export async function signOut(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/signout`, {
    method: 'POST',
    credentials: 'include',
  });

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new Error('Invalid JSON response');
  }

  const result = json as ApiResponse<null>;

  if (!result.success) {
    throw new ApiError(result.error);
  }
}
