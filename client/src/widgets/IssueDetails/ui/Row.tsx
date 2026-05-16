import type { ReactNode } from 'react';
import { cn } from '../../../shared/utils/cn';

interface RowProps {
  children: ReactNode[];
  className?: string;
}

export function Row({ children, className = '' }: RowProps) {
  return (
    <div
      className={cn(
        'relative grid grid-cols-[min-content_1fr] gap-4',
        className
      )}
    >
      {children}
    </div>
  );
}
