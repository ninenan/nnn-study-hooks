import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

type GetStateAction<T> = () => T;

function useGetState<T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, GetStateAction<T>];

function useGetState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>
];

function useGetState<T>(initialState?: T) {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const getState = useCallback(() => {
    return stateRef.current;
  }, []);

  return [state, setState, getState];
}

export default useGetState;
