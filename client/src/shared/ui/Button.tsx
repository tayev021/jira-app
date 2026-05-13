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
      className={cn('leading-none cursor-pointer', className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
