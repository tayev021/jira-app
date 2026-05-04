import { IssuePriority } from './IssuePriority';
import { IssueStatus } from './IssueStatus';

export interface Issue {
  id: string;
  slug: string;
  title: string;
  description: string;
  workspaceId: string;
  reporterId: string;
  assigneeIds: string[];
  status: IssueStatus;
  priority: IssuePriority;
  createdAt: string;
  updatedAt: string;
}
