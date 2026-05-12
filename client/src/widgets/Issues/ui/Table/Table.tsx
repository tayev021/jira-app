import type { Issue } from '../../../../shared/types/Issue';
import { Heading } from './Heading';
import { Row } from './Row';

interface TableProps {
  issues: Issue[];
}

export function Table({ issues }: TableProps) {
  return (
    <table className="min-w-full border border-collapse border-gray-primary-light leading-none">
      <Heading />
      <tbody>
        {issues.map((issue) => (
          <Row key={issue.id} issue={issue} />
        ))}
      </tbody>
    </table>
  );
}
