import { Workspace } from '../../modules/workspace/workspace.model';
import { ForbiddenError } from '../errors';

export async function restrictToMember(
  workspace: Workspace,
  userId: string,
  message = 'You are not a member of this workspace. You do not have permission to perform this action'
) {
  const isMember = workspace.memberIds.some((id) => id.toString() === userId);

  if (!isMember) {
    throw new ForbiddenError(message);
  }
}
