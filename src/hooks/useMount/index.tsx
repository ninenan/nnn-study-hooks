import { TFn } from '@/types';
import { useEffect } from 'react';

export default (fn?: TFn) => {
  useEffect(() => {
    fn && fn();
  }, []);
};
