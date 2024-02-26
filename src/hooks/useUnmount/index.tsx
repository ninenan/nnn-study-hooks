import { useEffect } from 'react';
import { TFn } from '@/types';
import useLatest from '../useLatest';

function useUnmount(fn: TFn) {
  const fnRef = useLatest(fn);

  useEffect(() => {
    return () => fnRef.current();
  }, []);
}

export default useUnmount;
