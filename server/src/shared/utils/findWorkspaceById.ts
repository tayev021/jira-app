import { Workspace } from '../../modules/workspace/workspace.model';
import { ApiError } from '../errors';

export async function findWorkspaceById(workspaceId: string) {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new ApiError(400, 'ERROR', 'Workspace with this ID does not exist');
  }

  return workspace;
}
