import { createPortal } from 'react-dom';
import { useModal } from '../../hooks/useModal';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { cloneElement, type ReactElement } from 'react';
import { cn } from '../../utils/cn';

interface WindowProps {
  name: string;
  children: ReactElement;
  className?: string;
}

interface ChildElementProps {
  close: () => void;
}

export function Window({ children, name, className = '' }: WindowProps) {
  const { modalName, close } = useModal();
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== modalName) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed top-0 left-0 w-screen h-screen backdrop-blur-[2px] transition-all z-50"
    >
      <div
        ref={ref}
        className={cn('fixed top-1/2 left-1/2 -translate-1/2', className)}
      >
        {cloneElement(children as React.ReactElement<ChildElementProps>, {
          close,
        })}
      </div>
    </div>,
    document.body
  );
}
