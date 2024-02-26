import React, { useState, useRef } from 'react';

export default function DemoUseRef() {
  const scrollEl = useRef<HTMLDivElement>(null);
  const [clientHeight, setClientHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [ScrollHeight, setScrollHeight] = useState(0);

  const onScroll = () => {
    if (scrollEl.current) {
      const clientHeight = scrollEl?.current.clientHeight;
      const scrollTop = scrollEl?.current.scrollTop;
      const scrollHeight = scrollEl?.current.scrollHeight;

      setClientHeight(clientHeight);
      setScrollTop(scrollTop);
      setScrollHeight(scrollHeight);
    }
  };

  return (
    <div>
      <div>
        <p>可视区域高度:{clientHeight}</p>
        <p>滚动条滚动高度:{scrollTop}</p>
        <p>滚动内容高度:{ScrollHeight}</p>
      </div>
      <div
        onScroll={onScroll}
        ref={scrollEl}
        style={{ height: 200, border: '1px solid #ccc', overflow: 'auto' }}
      >
        <div style={{ height: 2000 }}></div>
      </div>
    </div>
  );
}
