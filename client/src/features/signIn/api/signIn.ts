import type { SignInSchema } from '../model/signIn.schema';
import type { User } from '../../../shared/types/User';
import { api } from '../../../shared/api/api';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import { ApiError } from '../../../shared/utils/ApiError';

export async function signIn(signinData: SignInSchema): Promise<User> {
  const response = await api('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(signinData),
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
