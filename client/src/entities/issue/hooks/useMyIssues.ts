import { useAuth } from '../../../shared/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import type { Issue } from '../../../shared/types/Issue';
import type { ApiError } from '../../../shared/utils/ApiError';
import { getMyIssues } from '../api/getMyIssues';

export function useMyIssues() {
  const { currentUser } = useAuth();
  const {
    data: issues,
    isLoading,
    isError,
    error,
  } = useQuery<Issue[], ApiError>({
    queryFn: getMyIssues,
    queryKey: ['my-issues', currentUser?.id],
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    retry: false,
  });

  return { issues, isLoading, isError, error };
}
