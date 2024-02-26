import useCreation from '@/hooks/useCreation';
import React, { useState } from 'react';
import { Button } from 'nnn-toy-ui';

function DemoUseCreation() {
  const [flag, setFlag] = useState(false);
  const getNowData = () => {
    return Math.random();
  };

  const nowData = useCreation(() => getNowData(), []);

  return (
    <div>
      <div>正常的函数{getNowData()}</div>
      <div>useCreation 包裹之后: {nowData}</div>
      <Button btnType="warning" onClick={() => setFlag(v => !v)}>
        切换{JSON.stringify(flag)}
      </Button>
    </div>
  );
}

export default DemoUseCreation;
