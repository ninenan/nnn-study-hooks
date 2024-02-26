import React, { useState, useEffect, useLayoutEffect } from 'react';

// useLayoutEffect： 与 useEffect 基本一致，不同点在于它是同步执行的。简要说明：

// 1.
// 执行顺序：useLayoutEffect 是在 DOM 更新之后，浏览器绘制之前的操作，
// 这样可以更加方便地修改 DOM，获取 DOM 信息，这样浏览器只会绘制一次，
// 所以 useLayoutEffect 的执行顺序在 useEffect 之前；

// 2. useLayoutEffect 相当于有一层防抖效果；
// 3. useLayoutEffect 的 callback 中会阻塞浏览器绘制。

// useEffect 执行顺序：setCount 设置 => 在 DOM 上渲染 => useEffect 回调 => setCount 设置 => 在 DOM 上渲染。
// useLayoutEffect 执行顺序：setCount 设置 => useLayoutEffect 回调 => setCount 设置 => 在 DOM 上渲染。

export default function DemoUseLayoutEffect() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);

  useEffect(() => {
    if (count === 0) {
      setCount(10 + Math.random() * 100);
    }
  }, [count]);

  useLayoutEffect(() => {
    if (count1 === 0) {
      setCount1(10 + Math.random() * 100);
    }
  }, [count1]);

  return (
    <div>
      <div>useEffect count: {count}</div>
      <div>useLayoutEffect count1: {count1}</div>
    </div>
  );
}
