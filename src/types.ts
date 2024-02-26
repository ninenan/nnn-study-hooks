import { MutableRefObject } from 'react';

export type neverAny = any;
export type TFn = () => void;
export type TNoop = (...rest: neverAny[]) => neverAny;
export type TargetValue<T> = T | undefined | null;
export type TargetType = HTMLElement | Element | Window | Document;
export type BasicTarget<T extends TargetType = Element> =
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;
