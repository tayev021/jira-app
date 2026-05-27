import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '../../../shared/utils/ApiError';
import { deleteAccount } from '../api/deleteAccount';

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, null>({
    mutationFn: () => deleteAccount(),
    retry: false,
    onSuccess: () => queryClient.setQueryData(['me'], null),
  });
}
