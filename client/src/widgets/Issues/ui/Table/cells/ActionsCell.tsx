import type { Issue } from '../../../../../shared/types/Issue';
import { useAuth } from '../../../../../shared/hooks/useAuth';
import { useWorkspace } from '../../../../../entities/workspace';
import { Cell } from './Cell';
import { Modal } from '../../../../../shared/ui/Modal';
import { Button } from '../../../../../shared/ui/Button';
import { HiOutlineTrash } from 'react-icons/hi2';
import { DeleteIssue } from '../../../../../features/deleteIssue';

interface ActionsCellProps {
  issue: Issue;
}

export function ActionsCell({ issue }: ActionsCellProps) {
  const { currentUser } = useAuth();
  const { workspace } = useWorkspace();

  return (
    <Cell>
      <Modal.Open modalName={`delete-issue-${issue.id}`}>
        <Button
          className="flex items-center mx-auto text-lg text-gray-primary hover:text-red-primary disabled:cursor-not-allowed"
          disabled={
            currentUser?.id !== issue.reporter.id &&
            currentUser?.id !== workspace?.owner.id
          }
        >
          <HiOutlineTrash />
        </Button>
      </Modal.Open>
      <Modal.Window name={`delete-issue-${issue.id}`}>
        <DeleteIssue issue={issue} />
      </Modal.Window>
    </Cell>
  );
}
