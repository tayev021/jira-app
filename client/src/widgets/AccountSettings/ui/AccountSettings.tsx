import { useWorkspaces } from '../../../entities/workspace';
import { DeleteAccount } from '../../../features/deleteAccount';
import { useAuth } from '../../../shared/hooks/useAuth';
import { Button } from '../../../shared/ui/Button';
import { Modal } from '../../../shared/ui/Modal';

export function AccountSettings() {
  const { currentUser } = useAuth();
  const { workspaces } = useWorkspaces();
  const hasOwnWorkspaces = workspaces?.some(
    (workspace) => workspace.owner.id === currentUser?.id
  );

  if (!currentUser) return null;

  return (
    <ul>
      <li className="flex flex-col items-center gap-2 p-5 border border-gray-primary-light rounded-md shadow-md">
        <h4 className="font-semibold text-base text-center text-red-primary">
          Delete Account
        </h4>
        <p className="text-center">
          Once you delete your account, there is no going back. Please be
          certain
        </p>

        {hasOwnWorkspaces && (
          <p className="font-medium text-center text-red-primary">
            You cannot delete a workspace owner account
          </p>
        )}

        <Modal.Open modalName={`delete-account-${currentUser.id}`}>
          <Button
            className="px-4 py-1 border border-gray-primary rounded-md text-base text-gray-primary leading-none hover:border-red-primary hover:text-red-primary hover:shadow-md disabled:cursor-not-allowed"
            disabled={hasOwnWorkspaces}
          >
            Delete Account
          </Button>
        </Modal.Open>
        <Modal.Window name={`delete-account-${currentUser.id}`}>
          <DeleteAccount />
        </Modal.Window>
      </li>
    </ul>
  );
}
