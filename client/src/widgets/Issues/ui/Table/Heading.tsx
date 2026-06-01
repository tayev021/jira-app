import { Table } from '../../../../shared/ui/Table';
import { HeadingCell } from './cells/HeadingCell';

export function Heading() {
  return (
    <Table.Row
      role="rowheader"
      className="sticky top-0 font-medium text-secondary-text bg-primary hover:bg-primary z-20"
    >
      <HeadingCell className="sticky left-0 bg-primary z-30">Issue</HeadingCell>
      <HeadingCell>Reporter</HeadingCell>
      <HeadingCell>Assignee</HeadingCell>
      <HeadingCell>Priority</HeadingCell>
      <HeadingCell>Status</HeadingCell>
      <HeadingCell>Created</HeadingCell>
      <HeadingCell>Updated</HeadingCell>
      <HeadingCell>Actions</HeadingCell>
    </Table.Row>
  );
}
