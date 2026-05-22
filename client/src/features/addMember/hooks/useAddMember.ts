import { useAuth } from '../../../shared/hooks/useAuth';
import { useParams } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '../../../shared/types/User';
import type { ApiError } from '../../../shared/utils/ApiError';
import { addMember } from '../api/addMember';
import type { Workspace } from '../../../shared/types/Workspace';

export function useAddMember() {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, { userId: string }>({
    mutationFn: ({ userId }) =>
      addMember({
        userId,
        workspaceId: workspaceId as string,
      }),
    retry: false,
    onSuccess: (member) => {
      queryClient.setQueryData<Workspace>(
        ['workspace', workspaceId, currentUser?.id],
        (workspace) => {
          if (!workspace) return workspace;

          return {
            ...workspace,
            members: [...workspace.members, member],
          };
        }
      );
      queryClient.invalidateQueries({
        queryKey: ['search-users'],
      });
    },
  });
}
