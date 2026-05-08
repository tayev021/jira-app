import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useParams } from 'react-router';
import type { Issue } from '../../../shared/types/Issue';
import type { ApiError } from '../../../shared/utils/ApiError';
import { getIssues } from '../api/getIssues';

export function useIssues() {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const {
    data: issues,
    isLoading,
    isError,
    error,
  } = useQuery<Issue[], ApiError>({
    queryFn: () => getIssues(workspaceId!),
    queryKey: ['issues', workspaceId, currentUser?.id],
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return { issues, isLoading, isError, error };
}
