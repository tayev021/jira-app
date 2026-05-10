import { useContext } from 'react';
import { ModalContext, type ModalContextType } from '../context/ModalContext';

export function useModal(): ModalContextType {
  const context = useContext(ModalContext);

  if (!context)
    throw new Error('The useModal hook must be used inside ModalContext!');

  return context;
}
