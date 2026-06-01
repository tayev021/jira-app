import { Workspace } from '../../modules/workspace/workspace.model';
import { NotFoundError } from '../errors';

export async function findWorkspaceById(workspaceId: string) {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError('Workspace with this ID does not exist');
  }

  return workspace;
}
