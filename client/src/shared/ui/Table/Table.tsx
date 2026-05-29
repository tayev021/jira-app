import type { FC, ReactNode } from 'react';
import { Row } from './Row';
import { Cell } from './Cell';
import { cn } from '../../utils/cn';

interface TableProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

type TableComponent = FC<TableProps> & {
  Row: typeof Row;
  Cell: typeof Cell;
};

const Table: TableComponent = ({ children, className = '' }: TableProps) => {
  return (
    <div
      role="table"
      className={cn('relative min-w-max leading-normal', className)}
    >
      {children}
    </div>
  );
};

Table.Row = Row;
Table.Cell = Cell;

export { Table };
