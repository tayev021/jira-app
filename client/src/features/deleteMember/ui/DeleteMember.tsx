import { useDeleteMember } from '../hooks/useDeleteMember';
import toast from 'react-hot-toast';
import { Button } from '../../../shared/ui/Button';

interface DeleteMemberProps {
  memberId: string;
}

export function DeleteMember({ memberId }: DeleteMemberProps) {
  const mutation = useDeleteMember(memberId);

  function exclude() {
    mutation.mutate(null, {
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  return (
    <Button
      className="hidden px-3 py-1 rounded-full font-medium text-xs text-secondary-text bg-orange-primary cursor-pointer hover:bg-red-primary group-hover:block"
      onClick={() => exclude()}
    >
      Exclude
    </Button>
  );
}
