import useMount from '@/hooks/useMount';
import useUnmount from '@/hooks/useUnmount';
import useUnmountedRef from '@/hooks/useUnmountedRef';
import React, { useState } from 'react';
import { Button } from 'nnn-toy-ui';

const Child = () => {
  const unmountedRef = useUnmountedRef();
  useMount(() => console.log('初始化: ', unmountedRef));

  useUnmount(() => console.log('卸载: ', unmountedRef));

  return <div>Child</div>;
};

function DemoUseUnmountedRef() {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <div>父组件</div>
      <Button btnType="primary" onClick={() => setFlag(v => !v)}>
        切换 {flag ? '卸载' : '初始化'}
      </Button>
      {flag && <Child />}
    </div>
  );
}

export default DemoUseUnmountedRef;
