import { useParams } from 'react-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Issue } from '../../../shared/types/Issue';
import type { ApiError } from '../../../shared/utils/ApiError';
import { createIssue } from '../api/createIssue';

export function useCreateIssue() {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation<Issue, ApiError, { title: string; description: string }>({
    mutationFn: ({ title, description }) =>
      createIssue({ title, description, workspaceId: workspaceId as string }),
    retry: false,
    onSuccess: (issue) => {
      queryClient.setQueryData<Issue[]>(
        ['issues', workspaceId, currentUser?.id],
        (prev = []) => [...prev, issue]
      );
    },
  });
}
