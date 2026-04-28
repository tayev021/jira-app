import { useAuth } from '../../../shared/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Workspace } from '../../../shared/types/Workspace';
import type { ApiError } from '../../../shared/utils/ApiError';
import type { CreateWorkspaceSchema } from '../model/createWorkspace.schema';
import { createWorkspace } from '../api/createWorkspace';

export function useCreateWorkspace() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<Workspace, ApiError, CreateWorkspaceSchema>({
    mutationFn: createWorkspace,
    retry: false,
    onSuccess: (workspace) => {
      queryClient.setQueryData<Workspace[]>(
        ['workspaces', currentUser?.id],
        (prev = []) => [...prev, workspace]
      );
    },
  });
}
