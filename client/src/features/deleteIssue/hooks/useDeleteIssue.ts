import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '../../../shared/utils/ApiError';
import { deleteIssue } from '../api/deleteIssue';
import type { Issue } from '../../../shared/types/Issue';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useParams } from 'react-router';

export function useDeleteIssue(issueId: string) {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, null>({
    mutationFn: () => deleteIssue({ issueId }),
    retry: false,
    onSuccess: () => {
      queryClient.setQueryData<Issue[]>(
        ['issues', workspaceId, currentUser?.id],
        (prev = []) => prev.filter((issue) => issue.id !== issueId)
      );
    },
  });
}
