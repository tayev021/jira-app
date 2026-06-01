import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '../../../shared/types/User';
import type { ApiError } from '../../../shared/utils/ApiError';
import { updateBio } from '../api/updateBio';

export function useUpdateBio() {
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, { bio: string }>({
    mutationFn: (data: { bio: string }) => updateBio(data),
    retry: false,
    onSuccess: (user) => {
      queryClient.setQueryData(['me'], user);
    },
  });
}
