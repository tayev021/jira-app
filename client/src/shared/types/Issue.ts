import type { User } from './User';
import type { IssuePriority } from './IssuePriority';
import type { IssueStatus } from './IssueStatus';

export interface Issue {
  id: string;
  slug: string;
  title: string;
  description: string;
  workspaceId: string;
  reporter: User;
  assignees: User[];
  status: IssueStatus;
  priority: IssuePriority;
  createdAt: string;
  updatedAt: string;
  doneAt: string | null;
}
