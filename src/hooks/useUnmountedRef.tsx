import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

// 获取当前组件是否卸载
export default (): { readonly current: boolean } => {
  const unmountedEl = useRef<boolean>(false);

  useEffect(() => {
    unmountedEl.current = false;

    return () => {
      unmountedEl.current = true;
    };
  }, []);

  return unmountedEl;
};
