import type { NeverAny } from '@/types';
import { Input } from 'nnn-toy-ui';
import { useDeferredValue, useState } from 'react';

const getList = (key: NeverAny) => {
  const arr = [];

  for (let index = 0; index < 10000; index++) {
    if (String(index).includes(key)) {
      arr.push(<li key={index}>{index}</li>);
    }
  }

  return arr;
};

function DemoUseDeferredValue() {
  const [input, setInput] = useState('');
  const deferredValue = useDeferredValue(input);
  console.log('value', input);
  console.log('deferredValue', deferredValue);

  return (
    <div>
      <Input value={input} onChange={e => setInput(e.target.value)} />
      <div>
        <ul>{deferredValue ? getList(deferredValue) : null}</ul>
      </div>
    </div>
  );
}

export default DemoUseDeferredValue;
