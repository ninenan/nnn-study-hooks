import { useState, useEffect } from 'react';
import type { NeverAny } from '@/types';
import { getTarget } from '../../helpers';

export interface Options {
  root?: NeverAny;
  rootMargin?: string;
  threshold?: number | number[];
}

export interface Props {
  target: NeverAny;
  options?: Options;
}

const index = (target: Props['target'], options?: Props['options']) => {
  const [inViewport, setInViewport] = useState(false);
  const [ratio, setRatio] = useState<number>();

  useEffect(() => {
    const element = getTarget(target);

    // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
    const observe = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          setInViewport(entry.isIntersecting);
          setRatio(entry.intersectionRatio);
        }
      },
      {
        ...options,
        root: options?.root ? getTarget(options.root) : null
      }
    );

    observe.observe(element);

    return () => observe.disconnect();
  }, [target]);

  return [inViewport, ratio] as const;
};

export default index;
