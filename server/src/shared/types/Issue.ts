import { User } from './User';
import { IssueStatus } from './IssueStatus';
import { IssuePriority } from './IssuePriority';

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
