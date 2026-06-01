import type { Issue } from '../../../../shared/types/Issue';
import { Table } from '../../../../shared/ui/Table';
import { Heading } from './Heading';
import { Row } from './Row';

interface TableProps {
  issues: Issue[];
}

export function IssuesTable({ issues }: TableProps) {
  return (
    <Table>
      <Heading />

      {issues.map((issue) => (
        <Row key={issue.id} issue={issue} />
      ))}
    </Table>
  );
}
