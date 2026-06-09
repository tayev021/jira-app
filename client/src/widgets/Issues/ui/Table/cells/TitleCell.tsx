import type { Issue } from '../../../../../shared/types/Issue';
import { Link, useLocation } from 'react-router';
import { Table } from '../../../../../shared/ui/Table';

interface TitleCellProps {
  issue: Issue;
}

export function TitleCell({ issue }: TitleCellProps) {
  const location = useLocation();

  return (
    <Table.Cell className="sticky left-0 bg-primary-bg z-10 group-hover/tableRow:bg-secondary-bg">
      <Link
        to={`/app/workspace/${issue.workspaceId}/issues/${issue.id}`}
        state={{ backgroundLocation: location }}
        className="mr-2.5 border-b-2 border-transparent font-semibold text-primary cursor-pointer hover:border-primary"
      >
        {issue.slug}
      </Link>
      <span className="border-b-2 border-transparent truncate">
        {issue.title}
      </span>
    </Table.Cell>
  );
}
