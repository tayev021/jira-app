import type { Issue } from '../../../../../shared/types/Issue';
import { Cell } from './Cell';

interface TitleCellProps {
  issue: Issue;
}

export function TitleCell({ issue }: TitleCellProps) {
  return (
    <Cell className="sticky left-0 bg-inherit z-10">
      <span className="mr-2.5 border-b-2 border-transparent font-semibold text-primary cursor-pointer hover:border-primary">
        {issue.slug}
      </span>
      <span>{issue.title}</span>
    </Cell>
  );
}
