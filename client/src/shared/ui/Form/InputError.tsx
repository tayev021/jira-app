import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type InputErrorProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<'p'>;

export function InputError({
  children,
  className = '',
  ...rest
}: InputErrorProps) {
  return (
    <p
      className={cn(
        'max-w-[90%] absolute left-3 translate-y-[-50%] px-2 py-0.5 rounded-xl whitespace-nowrap text-white bg-red-500 overflow-y-auto no-scrollbar transition-all',
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
