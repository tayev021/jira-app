import toast from 'react-hot-toast';
import { useWorkspace } from '../../../entities/workspace';
import type { Issue } from '../../../shared/types/Issue';
import { useAddAssignee } from '../hooks/useAddAssignee';
import { getAvailableAssignees } from '../utils/getAvailableAssignees';
import { Assignee } from './Assignee';

interface AddAssigneeProps {
  issue: Issue;
}

export function AddAssignee({ issue }: AddAssigneeProps) {
  const { workspace } = useWorkspace();
  const mutation = useAddAssignee(issue.id);

  if (!workspace) throw new Error('No workspace');

  const availableAssignees = getAvailableAssignees(
    workspace?.members,
    issue.assignees
  );

  function handleAssign(assigneeId: string) {
    mutation.mutate(
      { assigneeId },
      {
        onError: (error) => toast.error(error.message),
      }
    );
  }

  return (
    <div className="w-100 h-120 flex flex-col p-5 border border-gray-primary-light rounded-sm bg-primary-bg shadow-md overflow-hidden">
      <h5 className="mb-6 font-semibold text-lg text-center text-gray-primary">
        Assignees
      </h5>
      {availableAssignees.length <= 0 ? (
        <p className="italic text-center">No available assignees</p>
      ) : (
        <ul className="min-h-0 overflow-y-auto">
          {availableAssignees.map((assignee) => (
            <Assignee
              key={assignee.id}
              assignee={assignee}
              onClick={() => handleAssign(assignee.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
