import { useMutation } from '@tanstack/react-query';
import type { User } from '../../../shared/types/User';
import type { ApiError } from '../../../shared/utils/ApiError';
import type { SignUpSchema } from '../model/signUp.schema';
import { signUp } from '../api/signUp';

export function useSignUp() {
  return useMutation<User, ApiError, SignUpSchema>({
    mutationFn: signUp,
    retry: false,
  });
}
