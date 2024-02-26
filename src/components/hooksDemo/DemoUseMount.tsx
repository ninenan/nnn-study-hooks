import { useState } from 'react';
import useMount from '@hooks/useMount';
import useUnmount from '@hooks/useUnmount';
import { Button } from 'nnn-toy-ui';

const Child = () => {
  useMount(() => {
    console.log('首次渲染');
  });

  useUnmount(() => {
    console.log('组件已卸载');
  });

  return <div>我是 child 组件</div>;
};

function DemoUseMount() {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <div>父组件</div>
      <div>
        <Button btnType="primary" onClick={() => setFlag(v => !v)}>
          切换{flag ? 'unmount' : 'mount'}
        </Button>
        {flag && <Child />}
      </div>
    </div>
  );
}

export default DemoUseMount;
