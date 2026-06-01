import { useParams } from 'react-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '../../../shared/utils/ApiError';
import { deleteMember } from '../api/deleteMember';
import type { Workspace } from '../../../shared/types/Workspace';

export function useDeleteMember(memberId: string) {
  const { currentUser } = useAuth();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, null>({
    mutationFn: () =>
      deleteMember({ memberId, workspaceId: workspaceId as string }),
    retry: false,
    onSuccess: () => {
      queryClient.setQueryData<Workspace>(
        ['workspace', workspaceId, currentUser?.id],
        (workspace) => {
          if (!workspace) return workspace;

          return {
            ...workspace,
            members: workspace.members.filter(
              (member) => member.id !== memberId
            ),
          };
        }
      );
      queryClient.invalidateQueries({
        queryKey: ['issues', workspaceId, currentUser?.id],
      });
    },
  });
}
