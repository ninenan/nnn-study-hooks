import { NeverAny } from '@/types';
import { useEffect } from 'react';
import useLatest from '../useLatest';

const useEventListener = (
  event: string,
  handler: (...e: NeverAny) => void,
  target?: NeverAny
) => {
  const handlerEl = useLatest(handler);

  useEffect(() => {
    // 支持 useRef 和 DOM 节点
    let targetElement: NeverAny;

    if (!target) {
      targetElement = window;
    } else if ('current' in target) {
      targetElement = target.current;
    } else {
      targetElement = target;
    }

    // 防止没有 addEventListener 属性
    if (!targetElement?.addEventListener) return;

    const useEventListener = (event: Event) => {
      return handlerEl.current(event);
    };

    targetElement.addEventListener(event, useEventListener);

    return () => {
      targetElement.removeEventListener(event, useEventListener);
    };
  }, [event, target]);
};

export default useEventListener;
