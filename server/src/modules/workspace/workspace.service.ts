import { ApiError, ForbiddenError } from '../../shared/errors';
import { mapWorkspace } from '../../shared/utils/mapWorkspace';
import { Workspace } from './workspace.model';

class WorkspaceService {
  getWorkspaces = async (data: { currentUserId: string }) => {
    const workspaces = await Workspace.find({ members: data.currentUserId });
    return { workspaces: workspaces.map(mapWorkspace) };
  };

  getWorkspace = async (data: {
    workspaceId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, currentUserId } = data;
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ApiError(400, 'ERROR', 'Workspace with this ID does not exist');
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

  createWorkspace = async (data: { name: string; currentUserId: string }) => {
    const { name, currentUserId } = data;
    const workspace = await Workspace.create({
      name,
      owner: currentUserId,
      members: [currentUserId],
    });
    return { workspace: mapWorkspace(workspace) };
  };

  updateWorkspaceName = async (data: {
    workspaceId: string;
    name: string;
    currentUserId: string;
  }) => {
    const { workspaceId, name, currentUserId } = data;
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ApiError(400, 'ERROR', 'Workspace with this ID does not exist');
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

  deleteWorkspace = async (data: {
    workspaceId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, currentUserId } = data;
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ApiError(400, 'ERROR', 'Workspace with this ID does not exist');
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
