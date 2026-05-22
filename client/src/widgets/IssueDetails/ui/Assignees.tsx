import type { Issue } from '../../../shared/types/Issue';
import { NoUserAvatar, UserLink } from '../../../entities/user';
import { useDeleteAssignee } from '../../../features/deleteAssignee';
import toast from 'react-hot-toast';
import { Button } from '../../../shared/ui/Button';

interface AssigneesProps {
  issue: Issue;
}

export function Assignees({ issue }: AssigneesProps) {
  const mutation = useDeleteAssignee(issue.id);

  function handleUnassign(assigneeId: string) {
    mutation.mutate(
      { assigneeId },
      {
        onError: (error) => toast.error(error.message),
      }
    );
  }

  return (
    <>
      {issue.assignees.length <= 0 ? (
        <div>
          <NoUserAvatar className="mr-2" />
          <span className="align-middle">Unassigned</span>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {issue.assignees.map((assignee) => (
            <li key={assignee.id} className="group flex justify-between gap-2">
              <UserLink key={assignee.id} user={assignee} />
              <Button
                className="hidden px-2 py-1 rounded-full font-medium text-xs text-secondary-text bg-orange-primary cursor-pointer hover:bg-red-primary group-hover:inline-block"
                onClick={() => handleUnassign(assignee.id)}
              >
                Unassign
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
