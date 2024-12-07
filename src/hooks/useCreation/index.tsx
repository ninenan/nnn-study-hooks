import type { DependencyList } from 'react';
import { useRef } from 'react';

// Object.is
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
const depsAreSame = (olsDeps: DependencyList, deps: DependencyList) => {
  if (olsDeps === deps) return true;

  for (let index = 0; index < olsDeps.length; index++) {
    if (!Object.is(olsDeps[index], deps[index])) return false;
  }

  return true;
};

// 强化 useMemo 和 useRef，用法与 useMemo 一样，一般用于性能优化。

// useMemo 的第一个参数 fn，会缓存对应的值，那么这个值就有可能拿不到最新的值，而 useCreation 拿到的值永远都是最新值；
// useRef 在创建复杂常量的时候，会出现潜在的性能隐患（如：实例化 new Subject），但 useCreation 可以有效地避免。
function useCreation<T>(fn: () => T, deps: DependencyList) {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false
  });

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = fn();
    current.initialized = true;
  }

  return current.obj as T;
}

export default useCreation;
