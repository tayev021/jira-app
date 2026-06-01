import type { Issue } from '../../../shared/types/Issue';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useWorkspace } from '../../../entities/workspace';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Button';
import { HiPlus } from 'react-icons/hi2';
import { AddAssignee } from '../../../features/addAssignee';

interface AddAssigneeProps {
  issue: Issue;
}

export function AddAssigneeButton({ issue }: AddAssigneeProps) {
  const { currentUser } = useAuth();
  const { workspace } = useWorkspace();

  return (
    <>
      <Modal.Open modalName={`add-assignee-to-issue-${issue.id}`}>
        <Button
          className="flex items-center px-1 py-1 mt-3 rounded-sm font-medium text-gray-primary hover:text-primary disabled:cursor-not-allowed"
          disabled={
            currentUser?.id !== issue.reporter.id &&
            currentUser?.id !== workspace?.owner.id
          }
        >
          <HiPlus className="text-lg" />
          <span className="ml-3">Add Assignee</span>
        </Button>
      </Modal.Open>
      <Modal.Window name={`add-assignee-to-issue-${issue.id}`}>
        <AddAssignee issue={issue} />
      </Modal.Window>
    </>
  );
}
