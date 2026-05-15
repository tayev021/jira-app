import type { Issue } from '../../../../shared/types/Issue';
import { Heading } from './Heading';
import { Row } from './Row';

interface TableProps {
  issues: Issue[];
}

export function Table({ issues }: TableProps) {
  return (
    <table className="relative min-w-full border-r border-b border-gray-primary-light border-separate border-spacing-0 leading-none">
      <Heading />
      <tbody>
        {issues.map((issue) => (
          <Row key={issue.id} issue={issue} />
        ))}
      </tbody>
    </table>
  );
}
