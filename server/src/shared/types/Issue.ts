import { IssueUser } from './IssueUser';
import { IssueStatus } from './IssueStatus';
import { IssuePriority } from './IssuePriority';

export interface Issue {
  id: string;
  slug: string;
  title: string;
  description: string;
  workspaceId: string;
  reporter: IssueUser;
  assignees: IssueUser[];
  status: IssueStatus;
  priority: IssuePriority;
  createdAt: string;
  updatedAt: string;
}
