import { useEffect } from 'react';
import { useIssues } from '../../../entities/issue';
import type { Issue } from '../../../shared/types/Issue';
import {
  IssueStatuses,
  type IssueStatus,
} from '../../../shared/types/IssueStatus';
import { Loader } from '../../../shared/ui/Loader';
import { Column } from './Column';
import toast from 'react-hot-toast';

export function Board() {
  const { issues = [], isLoading, isError, error } = useIssues();

  useEffect(() => {
    if (isError) {
      toast.error(error!.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader className="my-8" />;

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
    <div className="h-full grid grid-cols-[repeat(3,minmax(200px,400px))] gap-5 pl-1 pr-3 pb-1 overflow-y-auto">
      {IssueStatuses.map((status) => (
        <Column key={status} status={status} issues={groupedIssues[status]} />
      ))}
    </div>
  );
}
