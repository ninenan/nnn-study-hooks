import React, { useState } from 'react';
import { Button } from 'nnn-toy-ui';

function DemoUseState() {
  // eslint-disable-next-line
  let [count, setCount] = useState(0);
  const [obj, setObj] = useState({ count: 0 });

  return (
    <div>
      <div>数字形式：{count}</div>
      <Button
        type="button"
        btnType="primary"
        onClick={() => {
          setCount(++count);
        }}
      >
        add + 1
      </Button>
      <Button
        type="button"
        btnType="primary"
        onClick={() => {
          setCount(count => ++count);
        }}
      >
        add + 1（第二种形式）
      </Button>
      <div>
        <div>对象形式：{obj.count}</div>
        <Button
          type="button"
          btnType="primary"
          onClick={() => {
            obj.count++;
            setObj(obj);
          }}
        >
          add + 1
        </Button>
      </div>
    </div>
  );
}

export default DemoUseState;
