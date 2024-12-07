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
  // const [visibility, setVisibility] = useSafeState(() => getVisibility());
  const [visibility, setVisibility] = useState(() => getVisibility());

  useEventListener(
    'visibilitychange',
    () => {
      setVisibility(getVisibility());
    },
    document
  );

  return visibility;
};

export default Index;
