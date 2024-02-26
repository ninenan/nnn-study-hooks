import { BasicTarget } from '@/types';
import useEventListener from '../useEventListener';
import useSafeState from '../useSafeState';

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHover: boolean) => void;
}

const Index = (target: BasicTarget, options?: Options): boolean => {
  const { onLeave, onEnter, onChange } = options || {};
  const [isHover, setIsHover] = useSafeState(false);

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.();
      onChange?.(true);
      setIsHover(true);
    },
    target
  );

  useEventListener(
    'mouseleave',
    () => {
      onLeave?.();
      onChange?.(false);
      setIsHover(false);
    },
    target
  );

  return isHover;
};

export default Index;
