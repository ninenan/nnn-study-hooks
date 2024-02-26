import { useState } from 'react';
import useEventListener from '../useEventListener';
// import useSafeState from '../useSafeState';
import { isBrowser } from '../../helpers';

type VisibilityProps = 'hidden' | 'visible' | undefined;

const getVisibility = () => {
  if (!isBrowser) {
    return 'visible';
  }
  return document.visibilityState;
};
const Index = (): VisibilityProps => {
  // const [visiblity, setvisiblity] = useSafeState(() => getVisibility());
  const [visiblity, setvisiblity] = useState(() => getVisibility());

  useEventListener(
    'visibilitychange',
    () => {
      setvisiblity(getVisibility());
    },
    document
  );

  return visiblity;
};

export default Index;
