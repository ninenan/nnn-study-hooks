import type { TargetType, BasicTarget, NeverAny } from '@/types';

export const NOOP = () => {
  // NOOP
};

export const sleep = (timer: number) =>
  new Promise(resolve => setTimeout(resolve, timer));

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const getTarget = <T extends TargetType>(target: BasicTarget<T>) => {
  let targetElement: NeverAny;

  if (!target) {
    targetElement = window;
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
};
