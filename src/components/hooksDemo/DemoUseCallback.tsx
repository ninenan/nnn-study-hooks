import { Button } from 'nnn-toy-ui';
import { useState, useCallback, memo } from 'react';
import { NOOP } from '@/helpers';
import type { NeverAny } from '@/types';

const TestBtn = memo(({ children, onClick = NOOP }: NeverAny) => {
  console.log(children);

  return (
    <Button btnType="primary" onClick={onClick} style={{ marginRight: '10px' }}>
      {children}
    </Button>
  );
});

TestBtn.displayName = 'TestBtn';

// useCallback 必须配合 memo 一起使用，如果不搭配使用，性能可能会降低
// 切换 flag 的时候指挥触发普通点击的渲染
export default function DemoUseCallback() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(true);

  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <div>{count}</div>
      <TestBtn onClick={() => setCount(count + 1)}>普通点击</TestBtn>
      <TestBtn onClick={add}>callback 点击</TestBtn>
      <Button onClick={() => setFlag(v => !v)} btnType="default">
        切换 flag: {JSON.stringify(flag)}
      </Button>
    </div>
  );
}
