import { useAuth } from '../../../shared/hooks/useAuth';
import type { Workspace } from '../../../shared/types/Workspace';
import type { ApiError } from '../../../shared/utils/ApiError';
import { useQuery } from '@tanstack/react-query';
import { getWorkspace } from '../api/getWorkspace';

export function useWorkspace(workspaceId: string) {
  const { currentUser } = useAuth();
  const {
    data: workspace,
    isLoading,
    isError,
    error,
  } = useQuery<Workspace, ApiError>({
    queryFn: () => getWorkspace(workspaceId),
    queryKey: ['workspace', workspaceId, currentUser?.id],
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return { workspace, isLoading, isError, error };
}
