import { useQuery } from '@tanstack/react-query';
import type { Workspace } from '../../../shared/types/Workspace';
import type { ApiError } from '../../../shared/utils/ApiError';
import { getWorkspaces } from '../api/getWorkspaces';
import { useAuth } from '../../../shared/hooks/useAuth';

export function useWorkspaces() {
  const { currentUser } = useAuth();
  const {
    data: workspaces,
    isLoading,
    isError,
    error,
  } = useQuery<Workspace[], ApiError>({
    queryFn: getWorkspaces,
    queryKey: ['workspaces', currentUser?.id],
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return { workspaces, isLoading, isError, error };
}
