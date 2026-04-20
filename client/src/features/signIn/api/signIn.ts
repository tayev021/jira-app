import type { User } from '../../../shared/types/User';
import { API_URL } from '../../../shared/constants';
import type { SignInSchema } from '../model/signIn.schema';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import { ApiError } from '../../../shared/utils/ApiError';

export async function signIn(signinData: SignInSchema): Promise<User> {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signinData),
  });

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new Error('Invalid JSON response');
  }

  const result = json as ApiResponse<{ user: User }>;

  if (!result.success) {
    throw new ApiError(result.error);
  }

  return result.data.user;
}
