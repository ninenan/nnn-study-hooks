import type { NeverAny } from '@/types';
import useCreation from '../useCreation';
import useLatest from '../useLatest';
import useUpdate from '../useUpdate';

const observer = <T extends Record<string, NeverAny>>(
  initialVal: T,
  cb: () => void
): T => {
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return typeof res === 'object'
        ? observer(res, cb)
        : Reflect.get(target, key);
    },
    set(target, key, val) {
      const res = Reflect.set(target, key, val);
      cb();
      return res;
    }
  });
  return proxy;
};

// useReactive：一种具备响应式的 useState，用法与 useState 类似，但可以动态地设置值。
function useReactive<T extends Record<string, NeverAny>>(initialState: T): T {
  const ref = useLatest<T>(initialState);
  const update = useUpdate();

  const state = useCreation(
    () =>
      observer(ref.current, () => {
        update();
      }),
    []
  );

  return state;
}

export default useReactive;
