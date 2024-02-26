import useConunter from './index';
import { act, renderHook } from '@testing-library/react';

describe('useConuter 测试', () => {
  it('add + 1', () => {
    const { result } = renderHook(() => useConunter(9));
    expect(result.current[0]).toEqual(9);
    act(() => {
      result.current[1].add();
    });
    expect(result.current[0]).toEqual(10);
  });
});
