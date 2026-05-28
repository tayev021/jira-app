import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import type { User } from '../../../shared/types/User';
import type { ApiError } from '../../../shared/utils/ApiError';
import { getUser } from '../api/getUser';

export function useUser() {
  const { userId } = useParams();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User, ApiError>({
    queryFn: () => getUser({ userId: userId! }),
    queryKey: ['user-profile', userId],
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return { user, isLoading, isError, error };
}
