import toast from 'react-hot-toast';
import type { Issue } from '../../../shared/types/Issue';
import { Button } from '../../../shared/ui/Button';
import { useDeleteIssue } from '../hooks/useDeleteIssue';

interface DeleteIssueProps {
  issue: Issue;
  close?: () => void;
}

export function DeleteIssue({ issue, close = () => {} }: DeleteIssueProps) {
  const mutation = useDeleteIssue(issue.id);

  const handleDelete = () => {
    mutation.mutate(null, {
      onSuccess: () => close(),
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="flex flex-col gap-3 px-10 py-6 border border-gray-primary rounded-md bg-primary-bg shadow-md leading-none">
      <h5 className="font-medium text-base text-center">
        Delete issue{' '}
        <span className="font-semibold text-primary">{issue.slug}</span>
      </h5>
      <p>Are you sure you want to delete this issue?</p>
      <div className="flex justify-center gap-10 mt-5">
        <Button
          className="px-5 py-1 border border-red-primary rounded-sm shadow-sm text-red-primary hover:shadow-lg"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          className="px-5 py-1 border border-gray-primary rounded-sm shadow-sm hover:shadow-lg"
          onClick={close}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
