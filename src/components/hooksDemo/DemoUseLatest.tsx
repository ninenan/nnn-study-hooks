import useLatest from '@hooks/useLatest';
import { useEffect, useState } from 'react';

export default function DemoUseLatest() {
  const [count, setCount] = useState(0);
  const latestCount = useLatest<number>(count);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('count', count);
      setCount(latestCount.current + 1);
      // setCount(count + 1);
      console.log('ref', latestCount);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>useLatest</div>
      <div>count:{count}</div>
    </div>
  );
}
