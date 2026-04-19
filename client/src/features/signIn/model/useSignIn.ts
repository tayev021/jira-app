import { useMutation } from '@tanstack/react-query';
import type { User } from '../../../shared/types/User';
import type { ApiError } from '../../../shared/utils/ApiError';
import type { SignInSchema } from './signIn.schema';
import { signIn } from '../api/signIn';

export function useSignIn() {
  return useMutation<User, ApiError, SignInSchema>({
    mutationFn: signIn,
    retry: false,
  });
}
