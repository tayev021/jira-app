import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils/cn';

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<'button'>;

export function Button({
  children,
  className = '',
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-2 py-1 border border-gray-primary rounded-sm shadow-sm leading-none cursor-pointer hover:shadow-lg',
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}
