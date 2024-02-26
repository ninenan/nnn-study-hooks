import { renderHook } from '@testing-library/react';
import useEventListener from '..';

describe('useEventListener test', () => {
  it('should be undefined', () => {
    expect(useEventListener).toBeDefined();
  });

  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('c测试监听点击事件', () => {
    let count = 0;
    const onClick = () => {
      count++;
    };

    const { rerender, unmount } = renderHook(() => {
      useEventListener('click', onClick, container);
    });

    document.body.click();
    expect(count).toEqual(0);
    container.click();
    expect(count).toEqual(1);
    rerender();
    container.click();
    expect(count).toEqual(2);
    unmount();
    container.click();
    expect(count).toEqual(2);
  });
});
