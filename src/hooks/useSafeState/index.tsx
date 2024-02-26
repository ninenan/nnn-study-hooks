import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import useUnmountedRef from '../useUnmountedRef';

// useSafeState：使用方法与 useState 的用法完全一致，但在组件卸载后异步回调内的 setState 不再执行，
// 这样可以避免因组件卸载后更新状态而导致的内存泄漏。
// function useSafeState<S>(
//   initialState: S | (() => S)
// ): [S, Dispatch<SetStateAction<S>>];
// function useSafeState<S = undefined>(): [
//   S | undefined,
//   Dispatch<SetStateAction<S | undefined>>
// ];
// function useSafeState<T>(initialState?: T | (() => T)) {
//   const unmountedRef: { current: boolean } = useUnmountedRef();
//   const [state, setState] = useState(initialState);
//   const setCurrentState = useCallback((currentState: T) => {
//     if (unmountedRef.current) return;
//     setState(currentState);
//   }, []);
//
//   // 只是设置值的方法重写，加了一层前提判断，判断组件是否已卸载
//   return [state, setCurrentState] as const;
// }
//
// export default useSafeState;

function useSafeState<T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>];
function useSafeState<T = undefined>(): [
  T,
  Dispatch<SetStateAction<T | undefined>>
];
function useSafeState<T>(initialState?: T | (() => T)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);
  const setCurrentState = useCallback((currentState: T) => {
    if (unmountedRef.current) return;
    setState(currentState);
  }, []);

  return [state, setCurrentState] as const; // 只是设置值的方法重写，加了一层前提判断，判断组件是否已卸载
}

export default useSafeState;
