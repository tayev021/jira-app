import { useAuth } from '../../../shared/hooks/useAuth';
import { useParams } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '../../../shared/utils/ApiError';
import { deleteWorkspace } from '../api/deleteWorkspace';

export function useDeleteWorkspace() {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, null>({
    mutationFn: () => deleteWorkspace({ workspaceId: workspaceId as string }),
    retry: false,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['workspace', workspaceId, currentUser?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces'],
      });
    },
  });
}
