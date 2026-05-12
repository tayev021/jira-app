import type { ChangeEvent, ComponentProps, FocusEvent } from 'react';
import { cn } from '../../utils/cn';
import { useFieldContext } from '../../hooks/useFieldContext';

type TextAreaProps = {
  className?: string;
} & ComponentProps<'textarea'>;

export function TextArea({ className = '', ...rest }: TextAreaProps) {
  const { hasError, setIsFocused, setHasValue } = useFieldContext();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setHasValue(event.target.value.length > 0);
    rest.onChange?.(event);
  }

  function handleFocus(event: FocusEvent<HTMLTextAreaElement>) {
    setIsFocused(true);
    rest.onFocus?.(event);
  }
  function handleBlur(event: FocusEvent<HTMLTextAreaElement>) {
    setIsFocused(false);
    rest.onBlur?.(event);
  }

  return (
    <textarea
      className={cn(
        'w-full h-35 py-2.5 pl-3 pr-2 border-2 rounded-full border-gray-primary bg-primary-bg resize-none focus:border-primary focus:outline-none',
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
