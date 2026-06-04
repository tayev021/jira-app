import { Workspace } from './workspace.model';
import { User } from '../user/user.model';
import { mapWorkspace } from '../../shared/utils/mapWorkspace';
import { findWorkspaceById } from '../../shared/utils/findWorkspaceById';
import { WorkspaceStatistics } from '../../shared/types/WorkspaceStatistics';
import { restrictToOwner } from '../../shared/utils/restrictToOwner';
import { restrictToMember } from '../../shared/utils/restrictToMember';
import mongoose from 'mongoose';
import { generateUniqueSlug } from './utils/generateUniqueSlug';
import { Issue } from '../issue/issue.model';
import { ForbiddenError, NotFoundError } from '../../shared/errors';
import { mapUser } from '../../shared/utils/mapUser';

class WorkspaceService {
  getWorkspaces = async (data: { currentUserId: string }) => {
    const workspaces = await Workspace.find({
      memberIds: data.currentUserId,
    }).populate<{
      ownerId: User;
      memberIds: User[];
    }>(['ownerId', 'memberIds']);
    return { workspaces: workspaces.map(mapWorkspace) };
  };

  getWorkspace = async (data: {
    workspaceId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, currentUserId } = data;
    const workspace = await findWorkspaceById(workspaceId);

    await restrictToMember(workspace, currentUserId);

    const populatedWorkspace = await workspace.populate<{
      ownerId: User;
      memberIds: User[];
    }>(['ownerId', 'memberIds']);

    return { workspace: mapWorkspace(populatedWorkspace) };
  };

  getWorkspaceStatistics = async (data: {
    workspaceId: string;
  }): Promise<WorkspaceStatistics> => {
    const { workspaceId } = data;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [
      createdInLastWeek,
      updatedInLastWeek,
      completedInLastWeek,
      todoCount,
      inProgressCount,
      doneCount,
      noneCount,
      lowCount,
      mediumCount,
      highCount,
    ] = await Promise.all([
      Issue.countDocuments({
        workspaceId,
        createdAt: { $gte: weekAgo },
      }),
      Issue.countDocuments({
        workspaceId,
        updatedAt: { $gte: weekAgo },
      }),
      Issue.countDocuments({
        workspaceId,
        doneAt: { $gte: weekAgo },
      }),
      Issue.countDocuments({
        workspaceId,
        status: 'todo',
      }),
      Issue.countDocuments({
        workspaceId,
        status: 'in progress',
      }),
      Issue.countDocuments({
        workspaceId,
        status: 'done',
      }),
      Issue.countDocuments({
        workspaceId,
        priority: 'none',
      }),
      Issue.countDocuments({
        workspaceId,
        priority: 'low',
      }),
      Issue.countDocuments({
        workspaceId,
        priority: 'medium',
      }),
      Issue.countDocuments({
        workspaceId,
        priority: 'high',
      }),
    ]);

    return {
      createdInLastWeek,
      updatedInLastWeek,
      completedInLastWeek,
      statuses: {
        todo: todoCount,
        'in progress': inProgressCount,
        done: doneCount,
      },
      priorities: {
        none: noneCount,
        low: lowCount,
        medium: mediumCount,
        high: highCount,
      },
    };
  };

  createWorkspace = async (data: { name: string; currentUserId: string }) => {
    const { name, currentUserId } = data;
    const workspace = await Workspace.create({
      name,
      slug: await generateUniqueSlug(name),
      ownerId: currentUserId,
      memberIds: [currentUserId],
    });
    const populatedWorkspace = await workspace.populate<{
      ownerId: User;
      memberIds: User[];
    }>(['ownerId', 'memberIds']);

    return { workspace: mapWorkspace(populatedWorkspace) };
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

    const populatedWorkspace = await workspace.populate<{
      ownerId: User;
      memberIds: User[];
    }>(['ownerId', 'memberIds']);

    return { workspace: mapWorkspace(populatedWorkspace) };
  };

  addMember = async (data: {
    workspaceId: string;
    userId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, userId, currentUserId } = data;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('User with this ID does not exist');
    }

    const workspace = await findWorkspaceById(workspaceId);

    await restrictToOwner(workspace, currentUserId);

    workspace.memberIds.push(new mongoose.Types.ObjectId(userId));
    await workspace.save();

    return { member: mapUser(user) };
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
    await Issue.updateMany(
      {
        workspaceId,
        assigneeIds: memberId,
      },
      {
        $pull: {
          assigneeIds: memberId,
        },
      }
    );

    const populatedWorkspace = await workspace.populate<{
      ownerId: User;
      memberIds: User[];
    }>(['ownerId', 'memberIds']);

    return { workspace: mapWorkspace(populatedWorkspace) };
  };

  deleteWorkspace = async (data: {
    workspaceId: string;
    currentUserId: string;
  }) => {
    const { workspaceId, currentUserId } = data;
    const workspace = await findWorkspaceById(workspaceId);

    await restrictToOwner(workspace, currentUserId);

    const issuesCount = await Issue.countDocuments({ workspaceId });

    if (issuesCount > 0) {
      throw new ForbiddenError(
        `This workspace contains work issues. You cannot delete it`
      );
    }

    await workspace.deleteOne();
  };
}

export const workspaceService = new WorkspaceService();
