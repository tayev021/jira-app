import { createContext } from 'react';

export const FieldContext = createContext<{
  isFocused: boolean;
  hasValue: boolean;
  hasError: boolean;
  setIsFocused: (value: boolean) => void;
  setHasValue: (value: boolean) => void;
} | null>(null);
