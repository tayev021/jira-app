import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import type { User } from '../../../shared/types/User';
import type { ApiError } from '../../../shared/utils/ApiError';
import { searchUsers } from '../api/searchUsers';

export function useSearchUsers(query: string) {
  const { workspaceId } = useParams();
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<User[], ApiError>({
    queryFn: () => searchUsers({ query, workspaceId: workspaceId as string }),
    queryKey: ['search-users', query],
    enabled: query.trim().length >= 2,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return { users, isLoading, isError, error };
}
