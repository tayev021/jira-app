import { Workspace } from './workspace.model';
import { mapWorkspace } from '../../shared/utils/mapWorkspace';
import { findWorkspaceById } from '../../shared/utils/findWorkspaceById';
import { restrictToOwner } from '../../shared/utils/restrictToOwner';
import { restrictToMember } from '../../shared/utils/restrictToMember';
import mongoose from 'mongoose';

class WorkspaceService {
  getWorkspaces = async (data: { currentUserId: string }) => {
    const workspaces = await Workspace.find({ memberIds: data.currentUserId });
    return { workspaces: workspaces.map(mapWorkspace) };
  };

  getWorkspace = async (data: {
    workspaceId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, currentUserId } = data;
    const workspace = await findWorkspaceById(workspaceId);

    await restrictToMember(workspace, currentUserId);

    return { workspace: mapWorkspace(workspace) };
  };

  createWorkspace = async (data: { name: string; currentUserId: string }) => {
    const { name, currentUserId } = data;
    const workspace = await Workspace.create({
      name,
      ownerId: currentUserId,
      memberIds: [currentUserId],
    });

    return { workspace: mapWorkspace(workspace) };
  };

  updateWorkspaceName = async (data: {
    workspaceId: string;
    name: string;
    currentUserId: string;
  }) => {
    const { workspaceId, name, currentUserId } = data;
    const workspace = await findWorkspaceById(workspaceId);

    await restrictToOwner(workspace, currentUserId);

    workspace.name = name;
    await workspace.save();

    return { workspace: mapWorkspace(workspace) };
  };

  addMember = async (data: {
    workspaceId: string;
    memberId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, memberId, currentUserId } = data;
    const workspace = await findWorkspaceById(workspaceId);

    await restrictToOwner(workspace, currentUserId);

    workspace.memberIds.push(new mongoose.Types.ObjectId(memberId));
    await workspace.save();

    return { workspace: mapWorkspace(workspace) };
  };

  deleteMember = async (data: {
    workspaceId: string;
    memberId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, memberId, currentUserId } = data;
    const workspace = await findWorkspaceById(workspaceId);

    await restrictToOwner(workspace, currentUserId);

    workspace.memberIds = workspace.memberIds.filter(
      (id) => id.toString() !== memberId
    );
    await workspace.save();

    return { workspace: mapWorkspace(workspace) };
  };

  deleteWorkspace = async (data: {
    workspaceId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, currentUserId } = data;
    const workspace = await findWorkspaceById(workspaceId);

    await restrictToOwner(workspace, currentUserId);

    await workspace.deleteOne();
  };
}

export const workspaceService = new WorkspaceService();
