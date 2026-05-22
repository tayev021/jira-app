import { useAuth } from '../../../shared/hooks/useAuth';
import { useParams } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Issue } from '../../../shared/types/Issue';
import type { ApiError } from '../../../shared/utils/ApiError';
import { addAssignee } from '../api/addAssignee';

export function useAddAssignee(issueId: string) {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation<Issue, ApiError, { assigneeId: string }>({
    mutationFn: ({ assigneeId }) => addAssignee({ assigneeId, issueId }),
    retry: false,
    onSuccess: (issue) => {
      queryClient.setQueryData<Issue>(
        ['issue', issueId, currentUser?.id],
        () => issue
      );
      queryClient.setQueryData<Issue[]>(
        ['issues', workspaceId, currentUser?.id],
        (issues) => {
          if (!issues) return issues;

          return issues.map((i) => (i.id === issue.id ? issue : i));
        }
      );
    },
  });
}
