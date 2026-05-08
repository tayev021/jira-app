import toast from 'react-hot-toast';
import type { Issue } from '../../../shared/types/Issue';
import {
  IssuePriorities,
  type IssuePriority,
} from '../../../shared/types/IssuePriority';
import { useUpdateIssuePriority } from '../hooks/useUpdateIssuePriority';
import { Dropdown } from '../../../shared/ui/Dropdown';
import {
  HiOutlineBars2,
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
  HiOutlineChevronDown,
  HiOutlinePause,
} from 'react-icons/hi2';
import type { IconType } from 'react-icons';

interface UpdateIssuePriorityProps {
  issue: Issue;
}

const icons: Record<IssuePriority, IconType> = {
  none: HiOutlinePause,
  low: HiOutlineChevronDoubleDown,
  medium: HiOutlineBars2,
  high: HiOutlineChevronDoubleUp,
};

const colors: Record<IssuePriority, string> = {
  none: 'text-gray-primary',
  low: 'text-yellow-primary',
  medium: 'text-orange-primary',
  high: 'text-red-primary',
};

export function UpdateIssuePriority({ issue }: UpdateIssuePriorityProps) {
  const restPriorities = IssuePriorities.filter((s) => s !== issue.priority);
  const mutation = useUpdateIssuePriority();
  const Icon = icons[issue.priority];

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
          <Icon
            className={`inline-block text-base ${colors[issue.priority]}`}
          />
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
          const Icon = icons[priority];

          return (
            <button
              key={priority}
              className="px-1.75 py-0.75 font-medium uppercase text-left cursor-pointer hover:bg-gray-primary-light"
              onClick={() => handleUpdateIssuePriority(priority)}
            >
              <Icon
                className={`inline-block mr-1 text-base ${colors[priority]}`}
              />
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
