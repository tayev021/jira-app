import type { User } from '../../../shared/types/User';
import { api } from '../../../shared/api/api';
import { ApiError } from '../../../shared/utils/ApiError';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export async function updateBio(data: { bio: string }): Promise<User> {
  const response = await api(`/users/bio`, {
    method: 'PATCH',
    body: JSON.stringify({ bio: data.bio }),
  });

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Invalid JSON response' });
  }

  const result = json as ApiResponse<{ user: User }>;

  if (!result.success) {
    throw new ApiError(result.error);
  }

  return result.data.user;
}
