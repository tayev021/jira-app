import type { ChangeEvent, ComponentProps, FocusEvent } from 'react';
import { useFieldContext } from '../../hooks/useFieldContext';
import { cn } from '../../utils/cn';

type InputProps = {
  className?: string;
} & ComponentProps<'input'>;

export function Input({ className = '', ...rest }: InputProps) {
  const { hasError, setIsFocused, setHasValue } = useFieldContext();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setHasValue(event.target.value.length > 0);
    rest.onChange?.(event);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    setIsFocused(true);
    rest.onFocus?.(event);
  }
  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    setIsFocused(false);
    rest.onBlur?.(event);
  }

  return (
    <input
      className={cn(
        'w-full py-2.5 pl-3 pr-2 border-2 rounded-full border-gray-primary bg-primary-bg focus:border-primary focus:outline-none',
        hasError ? 'border-red-primary focus:border-red-primary' : '',
        className
      )}
      {...rest}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
