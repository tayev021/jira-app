import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '../../../shared/utils/ApiError';
import { signOut } from '../api/signOut';

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError>({
    mutationFn: signOut,
    retry: false,
    onSuccess: () => {
      queryClient.setQueryData(['me'], null);
    },
  });
}
