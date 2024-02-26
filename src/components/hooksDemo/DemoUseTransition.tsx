// https://zh-hans.react.dev/reference/react/useTransition
import React, { useState, useTransition } from 'react';
import { Input } from 'nnn-toy-ui';

function DemoUsetransition() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState<string[]>([]);

  return (
    <div>
      <Input
        value={input}
        onChange={e => {
          setInput(e.target.value);
          startTransition(() => {
            const res: string[] = [];
            for (let index = 0; index < 10000; index++) {
              res.push(e.target.value);
            }
            setList(res);
          });
        }}
      ></Input>
      {isPending ? (
        <div>loading...</div>
      ) : (
        list.map(item => <div key={item}>{item}</div>)
      )}
    </div>
  );
}

export default DemoUsetransition;
