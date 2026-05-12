import { cloneElement, type ReactElement } from 'react';
import { useModal } from '../../hooks/useModal';

interface OpenProps {
  children: ReactElement;
  modalName: string;
}

interface ChildElementProps {
  onClick: (modalName: string) => void;
}

export function Open({ children, modalName }: OpenProps) {
  const { open } = useModal();

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    onClick: () => open(modalName),
  });
}
