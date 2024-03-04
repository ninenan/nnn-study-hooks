import { useRef, useImperativeHandle, useState } from 'react';
import { Button } from 'nnn-toy-ui';
import type { NeverAny } from '@/types';

const Child = ({ cRef }: { cRef: NeverAny }) => {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  useImperativeHandle(cRef, () => {
    return {
      add
    };
  });

  return (
    <div>
      <p>点击次数: {count}</p>
      <Button btnType="primary" onClick={add}>
        子组件的 add
      </Button>
    </div>
  );
};

export default function DemoUseImperativeHandle() {
  const childEl = useRef<NeverAny>(null);
  return (
    <div>
      <Button btnType="default" onClick={() => childEl.current.add()}>
        父组件的add
      </Button>
      <Child cRef={childEl} />
    </div>
  );
}
