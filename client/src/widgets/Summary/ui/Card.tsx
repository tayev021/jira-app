import type { ReactNode } from 'react';
import { cn } from '../../../shared/utils/cn';

interface CardProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 px-4 py-2 border border-gray-primary-light rounded-md shadow-sm text-nowrap overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}
