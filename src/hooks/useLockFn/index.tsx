import type { NeverAny } from '@/types';
import { useCallback, useRef } from 'react';

export default <
  P extends NeverAny[] = NeverAny[],
  V extends NeverAny = NeverAny
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
