import React, { useEffect, useState } from 'react';
import { Button } from 'nnn-toy-ui';

const Child = () => {
  useEffect(() => {
    // 挂载阶段触发
    console.log('mounted');

    return () => {
      // 卸载阶段
      console.log('unmounted');
    };
  }, []);

  return <div>我是 children 组件</div>;
};

export default function DemoUseEffect() {
  const [flag, setFlag] = useState(true);
  // eslint-disable-next-line
  let [count, setCount] = useState(0);
  // eslint-disable-next-line
  let [num, setNum] = useState(0);

  useEffect(() => {
    console.log('num changed');
  }, [num]);

  // 不要这么做
  // useEffect(() => {
  //   console.log('无限执行')
  // })

  return (
    <div>
      <Button btnType="primary" onClick={() => setFlag(v => !v)}>
        {flag ? '卸载' : '挂载'}
      </Button>
      <br />
      <Button btnType="primary" onClick={() => setCount(++count)}>
        count++
      </Button>
      <br />
      <Button btnType="primary" onClick={() => setNum(++num)}>
        num++
      </Button>
      <br />
      {flag && <Child />}
    </div>
  );
}
