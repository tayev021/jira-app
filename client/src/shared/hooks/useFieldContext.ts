import { useContext } from 'react';
import { FieldContext } from '../context/FieldContext';

export function useFieldContext() {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error(
      'The useFieldContext hook must be used inside FieldContext!'
    );
  }

  return context;
}
