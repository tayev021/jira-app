import { ApiError, ForbiddenError } from '../../shared/errors';
import { mapWorkspace } from '../../shared/utils/mapWorkspace';
import { Workspace } from './workspace.model';

class WorkspaceService {
  getWorkspaces = async (currentUserId: string) => {
    const workspaces = await Workspace.find({ members: currentUserId });
    return { workspaces: workspaces.map(mapWorkspace) };
  };

  getWorkspace = async (workspaceData: {
    workspaceId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, currentUserId } = workspaceData;
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ApiError(400, 'ERROR', 'No workspace with this ID was found');
    }

    const isMember = workspace.members.some(
      (memberId) => memberId.toString() === currentUserId
    );

    if (!isMember) {
      throw new ForbiddenError(
        'You are not a member of this workspace. You do not have permission to perform this action'
      );
    }

    return { workspace: mapWorkspace(workspace) };
  };

  createWorkspace = async (workspaceData: {
    name: string;
    ownerId: string;
  }) => {
    const { name, ownerId } = workspaceData;
    const workspace = await Workspace.create({
      name,
      owner: ownerId,
      members: [ownerId],
    });
    return { workspace: mapWorkspace(workspace) };
  };

  updateWorkspaceName = async (workspaceData: {
    workspaceId: string;
    name: string;
    currentUserId: string;
  }) => {
    const { workspaceId, name, currentUserId } = workspaceData;
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ApiError(400, 'ERROR', 'No workspace with this ID was found');
    }

    if (workspace.owner.toString() !== currentUserId) {
      throw new ForbiddenError(
        'You are not the owner of this workspace. You do not have permission to perform this action'
      );
    }

    workspace.name = name;
    await workspace.save();

    return { workspace: mapWorkspace(workspace) };
  };

  deleteWorkspace = async (workspaceData: {
    workspaceId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, currentUserId } = workspaceData;
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ApiError(400, 'ERROR', 'No workspace with this ID was found');
    }

    if (workspace.owner.toString() !== currentUserId) {
      throw new ForbiddenError(
        'You are not the owner of this workspace. You do not have permission to perform this action'
      );
    }

    await workspace.deleteOne();
  };
}

export const workspaceService = new WorkspaceService();
