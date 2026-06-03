import { PopulatedIssue } from '../../modules/issue/issue.model';
import { Issue } from '../types/Issue';
import { mapUser } from './mapUser';

export function mapIssue(issue: PopulatedIssue): Issue {
  return {
    id: issue._id.toString(),
    slug: issue.slug,
    title: issue.title,
    description: issue.description,
    workspaceId: issue.workspaceId.toString(),
    reporter: mapUser(issue.reporterId),
    assignees: issue.assigneeIds.map((assignee) => mapUser(assignee)),
    status: issue.status,
    priority: issue.priority,
    createdAt: issue.createdAt.toISOString(),
    updatedAt: issue.updatedAt.toISOString(),
    doneAt: issue.doneAt?.toISOString() || null,
  };
}
