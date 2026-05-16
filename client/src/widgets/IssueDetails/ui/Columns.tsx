import type { ReactNode } from 'react';
import { cn } from '../../../shared/utils/cn';

interface ColumnsProps {
  children: ReactNode[];
  className?: string;
}

export function Columns({ children, className = '' }: ColumnsProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4',
        className
      )}
    >
      {children}
    </div>
  );
}
