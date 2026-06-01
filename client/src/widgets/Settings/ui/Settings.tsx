import { useAuth } from '../../../shared/hooks/useAuth';
import { useWorkspace } from '../../../entities/workspace';
import { useIssues } from '../../../entities/issue';
import { Navigate, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Loader } from '../../../shared/ui/Loader';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Button';
import { DeleteWorkspace } from '../../../features/deleteWorkspace';
import toast from 'react-hot-toast';

export function Settings() {
  const { currentUser } = useAuth();
  const {
    workspace,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
    error: workspaceError,
  } = useWorkspace();
  const {
    issues,
    isLoading: isIssuesLoading,
    isError: isIssuesError,
    error: issuesError,
  } = useIssues();
  const navigate = useNavigate();

  useEffect(() => {
    if (isWorkspaceError) {
      toast.error(workspaceError!.message);
    }
  }, [isWorkspaceError, workspaceError]);

  useEffect(() => {
    if (isIssuesError) {
      toast.error(issuesError!.message);
    }
  }, [isIssuesError, issuesError]);

  if (isWorkspaceLoading || isIssuesLoading) return <Loader className="my-8" />;
  if (!currentUser) {
    return <Navigate to="/auth/signin" replace />;
  }
  if (!workspace) return null;
  if (!issues) return null;

  return (
    <ul className="max-w-140 mx-auto">
      <li className="flex flex-col items-center gap-2 p-4 border border-gray-primary-light rounded-sm shadow-sm">
        <h4 className="font-semibold text-base text-center text-primary">
          Delete Workspace
        </h4>
        <p className="text-center">
          Once you delete your workspace, there is no going back. Please be
          certain
        </p>

        {currentUser.id !== workspace.owner.id && (
          <p className="font-medium text-center text-red-primary">
            Only the owner of a workspace can delete it
          </p>
        )}
        {currentUser.id === workspace.owner.id && issues.length > 0 && (
          <p className="font-medium text-center text-red-primary">
            You cannot delete a workspace while it contains issues in progress
          </p>
        )}

        <Modal.Open modalName={`delete-workspace-${workspace.id}`}>
          <Button
            className="px-4 py-1 border border-gray-primary rounded-md text-base text-gray-primary leading-none hover:border-red-primary hover:text-red-primary hover:shadow-md disabled:cursor-not-allowed"
            disabled={issues.length > 0}
          >
            Delete Workspace
          </Button>
        </Modal.Open>
        <Modal.Window name={`delete-workspace-${workspace.id}`}>
          <DeleteWorkspace
            workspaceName={workspace.name}
            handleSuccess={() => navigate('/app')}
          />
        </Modal.Window>
      </li>
    </ul>
  );
}
