import { useEffect, useRef, useState } from 'react';

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const refTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (refTimer.current) {
      clearTimeout(refTimer.current);
    }

    refTimer.current = setTimeout(() => setDebouncedValue(value), delay);

    return function () {
      if (refTimer.current) {
        clearTimeout(refTimer.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}
