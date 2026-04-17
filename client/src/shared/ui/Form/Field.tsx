import { useState, type ComponentProps, type ReactNode } from 'react';
import { FieldContext } from '../../context/FieldContext';
import { cn } from '../../utils/cn';

type FieldProps = {
  children: ReactNode;
  className?: string;
  hasError?: boolean;
} & ComponentProps<'div'>;

export function Field({
  children,
  className = '',
  hasError = false,
  ...rest
}: FieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <FieldContext.Provider
      value={{ isFocused, hasValue, hasError, setIsFocused, setHasValue }}
    >
      <div className={cn('relative', className)} {...rest}>
        {children}
      </div>
    </FieldContext.Provider>
  );
}
