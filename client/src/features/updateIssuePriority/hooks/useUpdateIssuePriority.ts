import { useParams } from 'react-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Issue } from '../../../shared/types/Issue';
import type { ApiError } from '../../../shared/utils/ApiError';
import type { IssuePriority } from '../../../shared/types/IssuePriority';
import { updateIssuePriority } from '../api/updateIssuePriority';

export function useUpdateIssuePriority() {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation<
    Issue,
    ApiError,
    { issueId: string; priority: IssuePriority }
  >({
    mutationFn: ({ issueId, priority }) =>
      updateIssuePriority({ issueId, priority }),
    retry: false,
    onSuccess: (issue) => {
      queryClient.setQueryData<Issue[]>(
        ['issues', workspaceId, currentUser?.id],
        (prev = []) => prev.map((i) => (i.id === issue.id ? issue : i))
      );
      queryClient.setQueryData<Issue>(
        ['issue', issue.id, currentUser?.id],
        issue
      );
    },
  });
}
