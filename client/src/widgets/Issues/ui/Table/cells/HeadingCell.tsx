import { Table } from '../../../../../shared/ui/Table';

interface HeadingCellProps {
  children: string;
  className?: string;
}

export function HeadingCell({ children, className = '' }: HeadingCellProps) {
  return <Table.Cell className={className}>{children}</Table.Cell>;
}
