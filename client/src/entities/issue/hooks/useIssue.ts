import { useParams } from 'react-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import type { Issue } from '../../../shared/types/Issue';
import type { ApiError } from '../../../shared/utils/ApiError';
import { getIssue } from '../api/getIssue';

export function useIssue() {
  const { currentUser } = useAuth();
  const { issueId } = useParams();
  const {
    data: issue,
    isLoading,
    isError,
    error,
  } = useQuery<Issue, ApiError>({
    queryFn: () => getIssue(issueId!),
    queryKey: ['issue', issueId, currentUser?.id],
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return { issue, isLoading, isError, error };
}
