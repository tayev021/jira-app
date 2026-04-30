import { Workspace } from '../../modules/workspace/workspace.model';
import { ForbiddenError } from '../errors';

export async function restrictToOwner(workspace: Workspace, userId: string) {
  if (workspace.ownerId.toString() !== userId) {
    throw new ForbiddenError(
      'You are not the owner of this workspace. You do not have permission to perform this action'
    );
  }
}
