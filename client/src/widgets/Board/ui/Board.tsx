import { useIssues } from '../../../entities/issue';
import type { Issue } from '../../../shared/types/Issue';
import {
  IssueStatuses,
  type IssueStatus,
} from '../../../shared/types/IssueStatus';
import { Column } from './Column';

export function Board() {
  const { issues = [] } = useIssues();
  const initialGroupedIssues = Object.fromEntries(
    IssueStatuses.map((status) => [status, [] as Issue[]])
  ) as Record<IssueStatus, Issue[]>;
  const groupedIssues = issues.reduce<Record<IssueStatus, Issue[]>>(
    (acc, issue) => {
      acc[issue.status].push(issue);
      return acc;
    },
    initialGroupedIssues
  );

  return (
    <div className="h-full grid grid-cols-[repeat(3,minmax(200px,400px))] gap-5 pr-3 overflow-y-auto">
      {IssueStatuses.map((status) => (
        <Column key={status} status={status} issues={groupedIssues[status]} />
      ))}
    </div>
  );
}
