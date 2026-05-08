import { useAuth } from '../../../shared/hooks/useAuth';
import { useParams } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Issue } from '../../../shared/types/Issue';
import type { ApiError } from '../../../shared/utils/ApiError';
import type { IssueStatus } from '../../../shared/types/IssueStatus';
import { updateIssueStatus } from '../api/updateIssueStatus';

export function useUpdateIssueStatus() {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation<Issue, ApiError, { issueId: string; status: IssueStatus }>(
    {
      mutationFn: ({ issueId, status }) =>
        updateIssueStatus({ issueId, status }),
      retry: false,
      onSuccess: (issue) => {
        queryClient.setQueryData<Issue[]>(
          ['issues', workspaceId, currentUser?.id],
          (prev = []) => prev.map((i) => (i.id === issue.id ? issue : i))
        );
      },
    }
  );
}
