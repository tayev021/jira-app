import { IssuePriority } from './IssuePriority';
import { IssueStatus } from './IssueStatus';

export interface WorkspaceStatistics {
  createdInLastWeek: number;
  updatedInLastWeek: number;
  completedInLastWeek: number;
  statuses: Record<IssueStatus, number>;
  priorities: Record<IssuePriority, number>;
}
