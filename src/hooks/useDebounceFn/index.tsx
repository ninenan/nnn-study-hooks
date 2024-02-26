import { TNoop } from '@/types';
import debounce from 'lodash/debounce';
import useCreation from '../useCreation';
import useLatest from '../useLatest';
import useUnmount from '../useUnmount';

export interface IDebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export default <T extends TNoop>(cb: T, options?: IDebounceOptions) => {
  const cbRef = useLatest(cb);

  const debounced = useCreation(
    () =>
      debounce(
        (...rest: Parameters<T>): ReturnType<T> => cbRef.current(...rest),
        options?.wait ?? 500,
        options
      ),
    []
  );

  useUnmount(() => debounced.cancel());

  return debounced;
};
