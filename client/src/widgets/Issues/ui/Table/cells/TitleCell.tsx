import type { Issue } from '../../../../../shared/types/Issue';
import { Link, useLocation } from 'react-router';
import { Cell } from './Cell';

interface TitleCellProps {
  issue: Issue;
}

export function TitleCell({ issue }: TitleCellProps) {
  const location = useLocation();

  return (
    <Cell className="sticky left-0 border-l-2 bg-inherit z-10">
      <Link
        to={`/app/workspace/${issue.workspaceId}/issues/${issue.id}`}
        state={{ backgroundLocation: location }}
        className="mr-2.5 border-b-2 border-transparent font-semibold text-primary cursor-pointer hover:border-primary"
      >
        {issue.slug}
      </Link>
      <span>{issue.title}</span>
    </Cell>
  );
}
