import { HiPlus } from 'react-icons/hi2';
import { SearchUsers } from '../../../features/searchUsers';
import { Button } from '../../../shared/ui/Button';
import { Modal } from '../../../shared/ui/Modal';
import { useAddMember } from '../../../features/addMember';
import toast from 'react-hot-toast';

export function InviteMember() {
  const mutation = useAddMember();

  function invite(userId: string) {
    mutation.mutate(
      { userId },
      {
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  }

  return (
    <>
      <Modal.Open modalName={`search-users`}>
        <Button className="flex items-center gap-2 px-2 py-1 mx-auto mb-6 rounded-sm font-medium text-gray-primary hover:text-primary">
          <HiPlus className="text-lg" />
          Invite Member
        </Button>
      </Modal.Open>
      <Modal.Window name={`search-users`}>
        <SearchUsers handleClickUser={invite} />
      </Modal.Window>
    </>
  );
}
