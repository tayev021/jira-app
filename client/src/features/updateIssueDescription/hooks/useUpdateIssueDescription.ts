import { useParams } from 'react-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Issue } from '../../../shared/types/Issue';
import type { ApiError } from '../../../shared/utils/ApiError';
import { updateIssueDescription } from '../api/updateIssueDescription';

export function useUpdateIssueDescription() {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation<Issue, ApiError, { issueId: string; description: string }>(
    {
      mutationFn: ({ issueId, description }) =>
        updateIssueDescription({ issueId, description }),
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
    }
  );
}
