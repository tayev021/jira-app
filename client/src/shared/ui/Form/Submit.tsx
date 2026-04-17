import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';

type SubmitProps = {
  className?: string;
} & ComponentProps<'button'>;

export function Submit({ className = '', ...rest }: SubmitProps) {
  return (
    <button
      type="submit"
      className={cn(
        'w-full p-3 pr-2 rounded-full font-bold text-white bg-primary cursor-pointer hover:bg-secondary',
        className
      )}
      {...rest}
    />
  );
}
