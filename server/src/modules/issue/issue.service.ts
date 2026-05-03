import { Issue } from './issue.model';
import { findWorkspaceById } from '../../shared/utils/findWorkspaceById';
import { restrictToMember } from '../../shared/utils/restrictToMember';
import { mapIssue } from '../../shared/utils/mapIssue';
import { findIssueById } from '../../shared/utils/findIssueById';
import { ForbiddenError } from '../../shared/errors';
import { IssueStatus } from '../../shared/types/IssueStatus';
import { IssuePriority } from '../../shared/types/IssuePriority';
import mongoose from 'mongoose';

class IssueService {
  getIssues = async (data: { workspaceId: string; currentUserId: string }) => {
    const { workspaceId, currentUserId } = data;
    const issues = await Issue.find({ workspaceId: workspaceId });
    const workspace = await findWorkspaceById(workspaceId);

    await restrictToMember(workspace, currentUserId);

    return { issues: issues.map(mapIssue) };
  };

  getIssue = async (data: { issueId: string; currentUserId: string }) => {
    const { issueId, currentUserId } = data;
    const issue = await findIssueById(issueId);
    const workspace = await findWorkspaceById(issue.workspaceId.toString());

    await restrictToMember(workspace, currentUserId);

    return { issue: mapIssue(issue) };
  };

  create = async (data: {
    title: string;
    description: string;
    workspaceId: string;
    currentUserId: string;
  }) => {
    const { title, description, workspaceId, currentUserId } = data;
    const workspace = await findWorkspaceById(workspaceId);

    await restrictToMember(workspace, currentUserId);

    const issue = await Issue.create({
      title,
      description,
      workspaceId,
      reporterId: currentUserId,
    });

    return { issue: mapIssue(issue) };
  };

  updateTitle = async (data: {
    issueId: string;
    title: string;
    currentUserId: string;
  }) => {
    const { issueId, title, currentUserId } = data;
    const issue = await findIssueById(issueId);
    const workspace = await findWorkspaceById(issue.workspaceId.toString());

    await restrictToMember(workspace, currentUserId);

    issue.title = title;
    await issue.save();

    return { issue: mapIssue(issue) };
  };

  updateDescription = async (data: {
    issueId: string;
    description: string;
    currentUserId: string;
  }) => {
    const { issueId, description, currentUserId } = data;
    const issue = await findIssueById(issueId);
    const workspace = await findWorkspaceById(issue.workspaceId.toString());

    await restrictToMember(workspace, currentUserId);

    issue.description = description;
    await issue.save();

    return { issue: mapIssue(issue) };
  };

  updateStatus = async (data: {
    issueId: string;
    status: IssueStatus;
    currentUserId: string;
  }) => {
    const { issueId, status, currentUserId } = data;
    const issue = await findIssueById(issueId);
    const workspace = await findWorkspaceById(issue.workspaceId.toString());

    await restrictToMember(workspace, currentUserId);

    issue.status = status;
    await issue.save();

    return { issue: mapIssue(issue) };
  };

  updatePriority = async (data: {
    issueId: string;
    priority: IssuePriority;
    currentUserId: string;
  }) => {
    const { issueId, priority, currentUserId } = data;
    const issue = await findIssueById(issueId);
    const workspace = await findWorkspaceById(issue.workspaceId.toString());

    await restrictToMember(workspace, currentUserId);

    issue.priority = priority;
    await issue.save();

    return { issue: mapIssue(issue) };
  };

  addAssignee = async (data: {
    issueId: string;
    assigneeId: string;
    currentUserId: string;
  }) => {
    const { issueId, assigneeId, currentUserId } = data;
    const issue = await findIssueById(issueId);
    const workspace = await findWorkspaceById(issue.workspaceId.toString());

    if (
      workspace.ownerId.toString() !== currentUserId &&
      issue.reporterId.toString() !== currentUserId
    ) {
      throw new ForbiddenError(
        'Only the workspace owner or the issue reporter can do this. You do not have permission to perform this action'
      );
    }

    issue.assigneeIds.push(new mongoose.Types.ObjectId(assigneeId));
    await issue.save();

    return { issue: mapIssue(issue) };
  };

  deleteAssignee = async (data: {
    issueId: string;
    assigneeId: string;
    currentUserId: string;
  }) => {
    const { issueId, assigneeId, currentUserId } = data;
    const issue = await findIssueById(issueId);
    const workspace = await findWorkspaceById(issue.workspaceId.toString());

    if (
      workspace.ownerId.toString() !== currentUserId &&
      issue.reporterId.toString() !== currentUserId
    ) {
      throw new ForbiddenError(
        'Only the workspace owner or the issue reporter can do this. You do not have permission to perform this action'
      );
    }

    issue.assigneeIds = issue.assigneeIds.filter(
      (id) => id.toString() !== assigneeId
    );
    await issue.save();

    return { issue: mapIssue(issue) };
  };

  deleteIssue = async (data: { issueId: string; currentUserId: string }) => {
    const { issueId, currentUserId } = data;
    const issue = await findIssueById(issueId);
    const workspace = await findWorkspaceById(issue.workspaceId.toString());

    if (
      workspace.ownerId.toString() !== currentUserId &&
      issue.reporterId.toString() !== currentUserId
    ) {
      throw new ForbiddenError(
        'Only the workspace owner or the issue reporter can do this. You do not have permission to perform this action'
      );
    }

    await issue.deleteOne();
  };
}

export const issueService = new IssueService();
