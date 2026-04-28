import type { ComponentProps } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { cn } from '../utils/cn';

type InlineInputProps = {
  onSubmit: () => void;
  className?: string;
} & ComponentProps<'input'>;

export function InlineInput({
  onSubmit,
  className = '',
  ...props
}: InlineInputProps) {
  return (
    <form onSubmit={onSubmit} className="w-full flex items-center gap-1">
      <input className={cn('w-full', className)} {...props} />
      <button className="w-6 h-6 aspect-square cursor-pointer">
        <HiChevronRight className="h-full w-full text-gray-primary hover:text-primary" />
      </button>
    </form>
  );
}
