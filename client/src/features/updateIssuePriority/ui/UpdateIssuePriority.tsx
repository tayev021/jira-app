import toast from 'react-hot-toast';
import type { Issue } from '../../../shared/types/Issue';
import {
  IssuePriorities,
  type IssuePriority,
} from '../../../shared/types/IssuePriority';
import { useUpdateIssuePriority } from '../hooks/useUpdateIssuePriority';
import { Dropdown } from '../../../shared/ui/Dropdown';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { IssuePriorityIcon } from '../../../shared/ui/IssuePriorityIcon';

interface UpdateIssuePriorityProps {
  issue: Issue;
}

export function UpdateIssuePriority({ issue }: UpdateIssuePriorityProps) {
  const restPriorities = IssuePriorities.filter((s) => s !== issue.priority);
  const mutation = useUpdateIssuePriority();

  function handleUpdateIssuePriority(priority: IssuePriority) {
    mutation.mutate(
      { issueId: issue.id, priority },
      {
        onError: (error) => toast.error(error.message),
      }
    );
  }

  return (
    <div className="w-30 h-5.5">
      <Dropdown.Open menuName={`issue-${issue.id}-priority`}>
        <button
          key={issue.priority}
          className="w-30 grid grid-cols-[min-content_1fr_min-content] items-center gap-1 px-2 py-0.75 rounded-sm font-medium uppercase bg-gray-primary-light cursor-pointer"
        >
          <IssuePriorityIcon priority={issue.priority} />
          <span className="font-medium text-left">
            {issue.priority.toUpperCase()}
          </span>
          <HiOutlineChevronDown />
        </button>
      </Dropdown.Open>
      <Dropdown.Menu
        name={`issue-${issue.id}-priority`}
        className="w-30 mt-1.5 border border-gray-primary rounded-sm flex flex-col leading-none bg-primary-bg shadow-md overflow-hidden"
      >
        {restPriorities.map((priority) => {
          return (
            <button
              key={priority}
              className="px-1.75 py-0.75 font-medium uppercase text-left cursor-pointer hover:bg-gray-primary-light"
              onClick={() => handleUpdateIssuePriority(priority)}
            >
              <IssuePriorityIcon priority={priority} className="mr-1" />
              <span className="font-medium align-middle">
                {priority.toUpperCase()}
              </span>
            </button>
          );
        })}
      </Dropdown.Menu>
    </div>
  );
}
