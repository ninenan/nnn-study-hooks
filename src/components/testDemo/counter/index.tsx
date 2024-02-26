import { useState } from 'react';

// eslint-disable-next-line
export default (initialVal: number = 0) => {
  const [count, setcount] = useState(initialVal);

  const add = (number = 1) => setcount(v => v + number);
  const del = (number = 1) => setcount(v => v - number);
  const set = (number = 1) => setcount(number);

  return [
    count,
    {
      add,
      del,
      set
    }
  ] as const;
};
