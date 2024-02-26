import { Button } from 'nnn-toy-ui';
import { useContext, createContext, useState } from 'react';

const CountContext = createContext({
  value: -1
});

const Child = () => {
  const count = useContext(CountContext);

  return (
    <div>
      子组件获取到的 count: {count.value}
      <div>
        <Grandson />
      </div>
    </div>
  );
};

const Grandson = () => {
  const count = useContext(CountContext);

  return <div>孙组件获取到的 count: {count.value}</div>;
};

export default function DemoUseContext() {
  const [count, setCount] = useState({ value: 1 });

  return (
    <div>
      <div>父组件的count: {count.value}</div>
      <Button
        btnType="primary"
        onClick={() => {
          const value = count.value + 1;
          setCount({ ...count, value });
        }}
      >
        count++
      </Button>
      <CountContext.Provider value={count}>
        <Child />
      </CountContext.Provider>
    </div>
  );
}
