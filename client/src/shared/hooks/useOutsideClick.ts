import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapture = true
) {
  const ref = useRef<T>(null);

  useEffect(
    function () {
      function escapeDown(event: KeyboardEvent) {
        if (event.key === 'Escape') handler();
      }

      document.addEventListener('keydown', escapeDown);

      return () => document.removeEventListener('keydown', escapeDown);
    },
    [handler]
  );

  useEffect(
    function () {
      function handleOutsideClick(event: PointerEvent) {
        if (ref.current && !ref.current.contains(event.target as HTMLElement))
          handler();
      }

      document.addEventListener('click', handleOutsideClick, listenCapture);

      return () =>
        document.removeEventListener(
          'click',
          handleOutsideClick,
          listenCapture
        );
    },
    [handler, listenCapture]
  );

  return ref;
}
