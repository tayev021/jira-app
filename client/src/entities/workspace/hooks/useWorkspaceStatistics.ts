import { useParams } from 'react-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import type { WorkspaceStatistics } from '../../../shared/types/WorkspaceStatistics';
import type { ApiError } from '../../../shared/utils/ApiError';
import { getWorkspaceStatistics } from '../api/getWorkspaceStatistics';

export function useWorkspaceStatistics() {
  const { workspaceId } = useParams();
  const { currentUser } = useAuth();
  const {
    data: workspaceStatistics,
    isLoading,
    isError,
    error,
  } = useQuery<WorkspaceStatistics, ApiError>({
    queryFn: () => getWorkspaceStatistics(workspaceId!),
    queryKey: ['workspaceStatistics', workspaceId, currentUser?.id],
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return { workspaceStatistics, isLoading, isError, error };
}
