import { useReducer, useState } from 'react';

// 强制组件重新渲染，最终返回一个函数。
// useReducer 写法
// function useUpdate() {
//   const [, update] = useReducer((num: number) => num + 1, 0);
//
//   return update;
// }

// useState 写法
const useUpdate = () => {
  // eslint-disable-next-line
  let [count, setCount] = useState(0);

  const update = () => {
    const nextCount = ++count;
    setCount(nextCount);
  };

  return update;
};

export default useUpdate;
