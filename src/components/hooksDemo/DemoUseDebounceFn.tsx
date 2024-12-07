import { useState, useCallback } from 'react';
import { Button } from 'nnn-toy-ui';
import debounce from 'lodash/debounce';
import useDebounceFn from '@/hooks/useDebounceFn';

const DemoUseDebounceFn = () => {
  const [count, setCount] = useState(0);

  const add = useDebounceFn(() => setCount(val => ++val), {
    wait: 500,
    leading: true
  });

  // debounce 会返回新函数，需要使用 useCallback 包裹
  const add2 = useCallback(
    debounce(() => setCount(val => ++val), 1000, {
      leading: true
    }),
    []
  );

  return (
    <div>
      <div>count: {count}</div>
      <Button onClick={() => add()}>add</Button>
      <Button onClick={() => add2()}>add2</Button>
    </div>
  );
};

export default DemoUseDebounceFn;
