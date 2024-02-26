import { useRef } from 'react';

export default <T,>(value: T): { readonly current: T } => {
  const refEl = useRef(value);
  refEl.current = value;

  return refEl;
};
