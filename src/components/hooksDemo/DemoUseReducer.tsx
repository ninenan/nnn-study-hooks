import React, { useReducer } from 'react';
import { Button } from 'nnn-toy-ui';

const Child: React.FC<{ count: number }> = ({ count }) => {
  console.log('child update');

  return <div>子组件的 count: {count}</div>;
};

// https://react.dev/reference/react/useReducer#
// 如果返回的 state 值和之前的一样，组件将不会更新
export default function DemoUseReducer() {
  console.log('父组件更新');

  const [count, dispatch] = useReducer(
    (
      state: number,
      action: {
        type: 'add' | 'sub' | 'no';
        payload: number;
      }
    ) => {
      switch (action.type) {
        case 'add':
          return state + action.payload;
        case 'sub':
          return state - action.payload;
        default:
          return state; // 兜底返回值
      }
    },
    0
  );

  return (
    <div>
      <div>{count}</div>
      <Button
        btnType="primary"
        onClick={() => dispatch({ type: 'add', payload: 3 })}
      >
        add+3
      </Button>
      <br />
      <Button
        btnType="primary"
        onClick={() => dispatch({ type: 'sub', payload: 1 })}
      >
        sub-1
      </Button>
      <br />
      <Button
        btnType="primary"
        onClick={() => dispatch({ type: 'no', payload: 4 })}
      >
        无用按钮
      </Button>
      <br />

      <Child count={count} />
    </div>
  );
}
