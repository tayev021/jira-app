import type { Issue } from '../../../shared/types/Issue';
import {
  IssueStatuses,
  type IssueStatus,
} from '../../../shared/types/IssueStatus';
import { useUpdateIssueStatus } from '../hooks/useUpdateIssueStatus';
import toast from 'react-hot-toast';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { Dropdown } from '../../../shared/ui/Dropdown';

interface UpdateIssueStatusProps {
  issue: Issue;
}

export function UpdateIssueStatus({ issue }: UpdateIssueStatusProps) {
  const restStatuses = IssueStatuses.filter((s) => s !== issue.status);
  const mutation = useUpdateIssueStatus();

  function handleUpdateIssueStatus(status: IssueStatus) {
    mutation.mutate(
      { issueId: issue.id, status },
      {
        onError: (error) => toast.error(error.message),
      }
    );
  }

  return (
    <div className="w-32 h-5.5">
      <Dropdown.Open menuName={`issue-${issue.id}-status`}>
        <button
          key={issue.status}
          className="w-32 flex gap-1 justify-between px-2 py-1 rounded-md font-medium uppercase bg-gray-primary-light cursor-pointer"
        >
          {issue.status}
          <HiOutlineChevronDown />
        </button>
      </Dropdown.Open>
      <Dropdown.Menu
        name={`issue-${issue.id}-status`}
        className="w-32 mt-1.5 border border-gray-primary rounded-md flex flex-col  leading-none bg-primary-bg shadow-md overflow-hidden"
      >
        {restStatuses.map((status) => (
          <button
            key={status}
            className="px-2 py-1 font-medium uppercase text-left cursor-pointer hover:bg-primary hover:text-secondary-text"
            onClick={() => handleUpdateIssueStatus(status)}
          >
            {status}
          </button>
        ))}
      </Dropdown.Menu>
    </div>
  );
}
