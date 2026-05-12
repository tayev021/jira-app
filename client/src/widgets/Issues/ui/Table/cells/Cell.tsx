import type { ReactNode } from 'react';
import { cn } from '../../../../../shared/utils/cn';

interface CellProps {
  children: ReactNode;
  className?: string;
}

export function Cell({ children, className = '' }: CellProps) {
  return (
    <td
      className={cn(
        'max-w-72 px-3 py-1.5 border border-gray-primary-light truncate',
        className
      )}
    >
      {children}
    </td>
  );
}
