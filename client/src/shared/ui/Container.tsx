import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return <div className={cn('max-w-300 mx-auto', className)}>{children}</div>;
}
