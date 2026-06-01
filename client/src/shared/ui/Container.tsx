import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface ContainerProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={cn(
        'max-w-300 h-full flex flex-col mx-auto p-5 overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}
