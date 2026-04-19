import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/getMe';
import type { User } from '../../../shared/types/User';
import type { ApiError } from '../../../shared/utils/ApiError';

export function useMe() {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User, ApiError>({
    queryFn: getMe,
    queryKey: ['me'],
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return { user, isLoading, isError, error };
}
