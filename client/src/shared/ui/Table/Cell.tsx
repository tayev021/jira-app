import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CellProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export function Cell({ children, className = '' }: CellProps) {
  return (
    <div
      role="cell"
      className={cn(
        'w-full flex items-center px-3 py-1 border border-gray-primary-light truncate',
        className
      )}
    >
      {children}
    </div>
  );
}
