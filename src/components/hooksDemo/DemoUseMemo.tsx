import React, { useState, useMemo } from 'react';
import { Button } from 'nnn-toy-ui';

// flag 的切换不会影响到 usePow
const usePow = (list: number[]) => {
  return useMemo(
    () =>
      list.map(item => {
        console.log('usePow');
        return Math.pow(item, 2);
      }),
    []
  );
};

export default function DemoUseMemo() {
  const [flag, setFlag] = useState(false);
  const data = usePow([1, 2, 3]);

  return (
    <div>
      <div>数字集合: {JSON.stringify(data)}</div>
      <Button btnType="primary" onClick={() => setFlag(v => !v)}>
        状态切换{JSON.stringify(flag)}
      </Button>
    </div>
  );
}
