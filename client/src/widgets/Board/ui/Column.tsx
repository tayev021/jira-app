import type { IssueStatus } from '../../../shared/types/IssueStatus';
import type { Issue } from '../../../shared/types/Issue';
import { useUpdateIssueStatus } from '../../../features/updateIssueStatus';
import type { DragEvent } from 'react';
import { Card } from './Card/Card';
import toast from 'react-hot-toast';

interface ColumnProps {
  status: IssueStatus;
  issues: Issue[];
}

export function Column({ status, issues }: ColumnProps) {
  const mutation = useUpdateIssueStatus();

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const issueId = e.dataTransfer.getData('issueId');

    mutation.mutate(
      { issueId, status },
      { onError: (error) => toast.error(error.message) }
    );
  };

  return (
    <div
      className="rounded-md bg-secondary-bg shadow-sm"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center p-2 border-b border-gray-primary-light shadow-sm">
        <h4 className="font-semibold text-base text-gray-primary uppercase leading-none">
          {status}
        </h4>
        <span className="px-1 ml-2 rounded-sm font-semibold text-gray-primary bg-gray-primary-light">
          {issues.length}
        </span>
      </div>
      <ul className="flex flex-col gap-2 px-2 py-3">
        {issues.map((issue) => (
          <Card key={issue.id} issue={issue} />
        ))}
      </ul>
    </div>
  );
}
