import { useEffect, useState } from 'react';
import useSafeState from '@/hooks/useSafeState';
import { Button } from 'nnn-toy-ui';

const Child = () => {
  const [value, setValue] = useSafeState<string>();

  useEffect(() => {
    setTimeout(() => {
      setValue('data loaded from server');
    }, 5000);
  }, []);

  const text = value || 'loading...';

  return <div>{text}</div>;
};

function DemoUseSafeState() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <Button onClick={() => setVisible(false)}>unmount</Button>
      {visible && <Child />}
    </div>
  );
}

export default DemoUseSafeState;
