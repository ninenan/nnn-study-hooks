import { fireEvent, render, renderHook, act } from '@testing-library/react';
import useHover from '..';
import TestWrapper from '../TestWrapper';

describe('useHover test', () => {
  it('should be undefined', () => {
    expect(useHover).toBeDefined();
  });

  it('useHover 测试用例', () => {
    const { getByText } = render(<TestWrapper />); // 模拟 div
    const { result } = renderHook(() => useHover(getByText('Hover')));

    act(() => void fireEvent.mouseEnter(getByText('Hover')));
    expect(result.current).toBe(true);

    act(() => void fireEvent.mouseLeave(getByText('Hover')));
    expect(result.current).toBe(false);
  });

  it('useHover test case02', () => {
    const { getByText } = render(<div>Hover</div>); // 模拟 div, getByText 获取对应的 div
    let count = 0;
    let flag = false;

    const { result } = renderHook(() =>
      useHover(getByText('Hover'), {
        onEnter: () => {
          count++;
        },
        onChange: isFlag => {
          flag = isFlag;
        },
        onLeave: () => {
          count++;
        }
      })
    );

    expect(result.current).toBe(false);
    act(() => void fireEvent.mouseEnter(getByText('Hover')));
    expect(result.current).toBe(true);
    expect(count).toBe(1);
    expect(flag).toBe(true);

    act(() => void fireEvent.mouseLeave(getByText('Hover')));
    expect(result.current).toBe(false);
    expect(count).toBe(2);
    expect(flag).toBe(false);
  });
});
