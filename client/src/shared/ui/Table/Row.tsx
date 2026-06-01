import type { AriaRole, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface RowProps {
  children: ReactNode | ReactNode[];
  className?: string;
  role?: AriaRole;
}

export function Row({ children, className = '', role = 'row' }: RowProps) {
  return (
    <div
      role={role}
      className={cn(
        'grid grid-cols-[repeat(3,200px)_145px_repeat(3,155px)_80px] hover:bg-secondary-bg',
        className
      )}
    >
      {children}
    </div>
  );
}
