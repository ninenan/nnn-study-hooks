import useSelections from '..';
import { renderHook, act } from '@testing-library/react';

const lists = [1, 2, 3];

describe('test useSelections', () => {
  it('should be defined', () => {
    expect(useSelections).toBeDefined();
  });

  it('test 001', () => {
    const { result } = renderHook(() => useSelections(lists));
    const { selectAdd, toggle, selectDel, setSelect } = result.current;
    act(() => {
      selectAdd(3);
    });
    expect(result.current.selected).toEqual([3]);
    act(() => {
      toggle(3);
    });
    expect(result.current.selected).toEqual([]);
    expect(result.current.isNoneSelected).toBeTruthy();
    act(() => {
      selectAdd([1, 2]);
    });
    expect(result.current.selected).toEqual([1, 2]);
    act(() => {
      selectDel(2);
    });
    expect(result.current.selected).toEqual([1]);
    expect(result.current.isNoneSelected).toBeFalsy();
    act(() => {
      selectAdd([1, 2, 3]);
    });
    expect(result.current.isNoneSelected).toBeFalsy();
    expect(result.current.isAllSelected).toBeTruthy();
    act(() => {
      setSelect([1, 2, 3]);
    });
    expect(result.current.isNoneSelected).toBeFalsy();
    expect(result.current.isAllSelected).toBeTruthy();
    act(() => {
      selectDel([2, 3]);
    });
    expect(result.current.isAllSelected).toBeFalsy();
    expect(result.current.selected).toEqual([1]);
    act(() => {
      setSelect(2);
    });
    expect(result.current.selected).toEqual([2]);
  });

  it('测试全选功能', () => {
    const { result } = renderHook(() => useSelections(lists));
    const { toggleAll } = result.current;
    act(() => {
      toggleAll();
    });
    expect(result.current.isAllSelected).toEqual(true);
    expect(result.current.selected).toEqual([1, 2, 3]);
  });

  it('测试反选功能', () => {
    const { result } = renderHook(() => useSelections(lists, [1, 2, 3]));
    const { toggleAll } = result.current;
    act(() => {
      toggleAll();
    });
    expect(result.current.isAllSelected).toEqual(false);
    expect(result.current.selected).toEqual([]);
  });
});
