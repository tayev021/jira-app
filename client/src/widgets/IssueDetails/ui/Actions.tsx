import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useWorkspace } from '../../../entities/workspace';
import { DeleteIssue } from '../../../features/deleteIssue';
import type { Issue } from '../../../shared/types/Issue';
import { Button } from '../../../shared/ui/Button';
import { Modal } from '../../../shared/ui/Modal';

interface ActionsProps {
  issue: Issue;
}

export function Actions({ issue }: ActionsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { workspace } = useWorkspace();

  function handleSuccessDelete() {
    navigate(location.state?.backgroundLocation || '/');
  }

  return (
    <ul className="mt-8 mx-auto">
      <li>
        <Modal.Open modalName={`delete-issue-${issue.id}-from-issue-details`}>
          <Button
            className="px-4 py-1 border border-gray-primary rounded-md text-base text-gray-primary leading-none hover:border-red-primary hover:text-red-primary hover:shadow-md disabled:cursor-not-allowed"
            disabled={
              currentUser?.id !== issue.reporter.id &&
              currentUser?.id !== workspace?.owner.id
            }
          >
            Delete Issue
          </Button>
        </Modal.Open>
        <Modal.Window name={`delete-issue-${issue.id}-from-issue-details`}>
          <DeleteIssue issue={issue} handleSuccess={handleSuccessDelete} />
        </Modal.Window>
      </li>
    </ul>
  );
}
