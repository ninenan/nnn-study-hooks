import { useState } from 'react';
import { Button } from 'nnn-toy-ui';
import useLockFn from '@/hooks/useLockFn';
import { sleep } from '@/helpers';

const mockRequest = async (count: number) => {
  await sleep(2000);
  return Promise.resolve(`执行完成, 当前为：${count + 3}`);
};

const DemoUseLockFn = () => {
  const [count, setcount] = useState(0);
  const [loading, setloading] = useState(false);

  const add = useLockFn(async num => {
    setloading(true);
    const res = await mockRequest(count);
    console.log('res', res);
    setloading(false);
    setcount(v => v + num);
  });

  return (
    <div>
      <div>DemoUseLockFn</div>
      <div>count: {count}</div>
      <Button disabled={loading} btnType="primary" onClick={() => add(3)}>
        add
      </Button>
    </div>
  );
};

export default DemoUseLockFn;
