import { isNumber } from 'lodash';
import { useRef, useCallback, useEffect } from 'react';

export default (cb: () => void, delay?: number) => {
  const timerCallback = useCallback(cb, []);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) {
      return;
    }

    timerRef.current = setTimeout(() => {
      timerCallback();
    }, delay);
  }, [delay]);

  return clear;
};
