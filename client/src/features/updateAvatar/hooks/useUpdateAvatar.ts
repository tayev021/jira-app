import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '../../../shared/types/User';
import type { ApiError } from '../../../shared/utils/ApiError';
import { updateAvatar } from '../api/updateAvatar';

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, FormData>({
    mutationFn: (data: FormData) => updateAvatar(data),
    retry: false,
    onSuccess: (user) => {
      queryClient.setQueryData(['me'], user);
    },
  });
}
