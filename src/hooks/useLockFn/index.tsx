import { neverAny } from '@/types';
import { useCallback, useRef } from 'react';

export default <
  P extends neverAny[] = neverAny[],
  V extends neverAny = neverAny
>(
  cb: (...args: P) => Promise<V>
) => {
  const visibleEl = useRef(false);

  return useCallback(
    async (...args: P) => {
      if (visibleEl.current) {
        return;
      }
      visibleEl.current = true;
      try {
        visibleEl.current = false;
        const res = await cb(...args);

        return res;
      } catch (error) {
        visibleEl.current = false;
        throw error;
      }
    },
    [cb]
  );
};
