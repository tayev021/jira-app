import { Issue as IssueModel } from '../../modules/issue/issue.model';
import { Issue } from '../types/Issue';

export function mapIssue(issue: IssueModel): Issue {
  return {
    id: issue._id.toString(),
    slug: issue.slug,
    title: issue.title,
    description: issue.description,
    workspaceId: issue.workspaceId.toString(),
    reporterId: issue.reporterId.toString(),
    assigneeIds: issue.assigneeIds.map((id) => id.toString()),
    status: issue.status,
    priority: issue.priority,
    createdAt: issue.createdAt.toISOString(),
    updatedAt: issue.updatedAt.toISOString(),
  };
}
