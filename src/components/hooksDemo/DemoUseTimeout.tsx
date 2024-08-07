import useTimeout from '@/hooks/useTimeout';
import { Button } from 'nnn-toy-ui';

const DemoUseTimeout = () => {
  const cb = () => {
    console.warn(333333);
  };

  const clear = useTimeout(cb, 3000);

  return (
    <div>
      <h3>DemoUseTimeout</h3>
      <Button onClick={() => clear()}>手动清除定时器</Button>
    </div>
  );
};

export default DemoUseTimeout;
