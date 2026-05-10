import type { ComponentProps } from 'react';
import { useFieldContext } from '../../hooks/useFieldContext';
import { cn } from '../../utils/cn';

type LabelProps = {
  children: string;
  className?: string;
} & ComponentProps<'label'>;

export function Label({ children, className = '', ...rest }: LabelProps) {
  const { isFocused, hasValue, hasError } = useFieldContext();

  return (
    <label
      className={cn(
        'absolute left-3 -translate-y-2 px-2 py-0.5 rounded-xl font-medium transition-all cursor-text',
        isFocused || hasValue
          ? 'top-0 text-secondary-text bg-gray-primary'
          : 'top-5',
        isFocused ? 'bg-primary' : '',
        (isFocused || hasValue) && hasError ? 'bg-red-primary' : '',
        className
      )}
      {...rest}
    >
      {children}
    </label>
  );
}
