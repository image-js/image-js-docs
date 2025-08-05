import { useEffect, useRef, useState } from 'react';

export default function useThrottle<T>(value: T, ms: number) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  // eslint-disable-next-line react-you-might-not-need-an-effect/no-reset-all-state-when-a-prop-changes
  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= ms) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      },
      ms - (Date.now() - lastRan.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, ms]);

  return throttledValue;
}
