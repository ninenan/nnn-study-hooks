import { TFn } from '@/types';
import { useEffect } from 'react';

// function useMount(fn?: TFn) {
//   useEffect(() => {
//     fn && fn();
//   }, []);
// }
//
// export default useMount;

export default (fn?: TFn) => {
  useEffect(() => {
    fn && fn();
  }, []);
};
