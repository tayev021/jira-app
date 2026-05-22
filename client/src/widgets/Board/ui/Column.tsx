import type { IssueStatus } from '../../../shared/types/IssueStatus';
import type { Issue } from '../../../shared/types/Issue';
import { useUpdateIssueStatus } from '../../../features/updateIssueStatus';
import type { DragEvent } from 'react';
import { Card } from './Card/Card';
import toast from 'react-hot-toast';
import { Modal } from '../../../shared/ui/Modal';
import { HiPlus } from 'react-icons/hi2';
import { Button } from '../../../shared/ui/Button';
import { CreateIssue } from '../../../features/createIssue';

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
      className="relative rounded-md bg-secondary-bg shadow-sm"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="sticky top-0 flex items-center p-2 border-b border-gray-primary-light rounded-md bg-secondary-bg shadow-sm z-10">
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
      <Modal.Open modalName={`create-issue-with-${status}`}>
        <Button className="flex items-center gap-2 px-2 py-1 ml-2 mb-3 rounded-sm font-medium text-gray-primary hover:text-primary">
          <HiPlus className="text-lg" />
          Create Issue
        </Button>
      </Modal.Open>
      <Modal.Window name={`create-issue-with-${status}`}>
        <CreateIssue />
      </Modal.Window>
    </div>
  );
}
