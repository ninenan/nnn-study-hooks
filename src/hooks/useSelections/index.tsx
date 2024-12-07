import { useState } from 'react';
import useCreation from '../useCreation';

export default <T,>(lists: T[], initialVal: T[] = []) => {
  const [selected, setSelected] = useState<T[]>(initialVal);
  const selectedSet = useCreation(() => new Set(selected), [selected]); // 通过 new Set 处理选中的数据，实际转换出去使用的使用需要 Array.from
  const isSelected = (data: T) => selectedSet.has(data); // 是否选中

  // add
  const selectAdd = (data: T | T[]) => {
    if (Array.isArray(data)) {
      data.map(item => selectedSet.add(item));
    } else {
      selectedSet.add(data);
    }

    setSelected(Array.from(selectedSet));
  };

  // del
  const selectDel = (data: T | T[]) => {
    if (Array.isArray(data)) {
      data.map(item => selectedSet.delete(item));
    } else {
      selectedSet.delete(data);
    }

    setSelected(Array.from(selectedSet));
  };

  // 设置
  const setSelect = (data: T | T[]) => {
    selectedSet.clear();
    if (Array.isArray(data)) {
      data.map(item => selectedSet.add(item));
    } else {
      selectedSet.add(data);
    }
    setSelected(Array.from(selectedSet));
  };

  // 单个切换
  const toggle = (data: T) => {
    isSelected(data) ? selectDel(data) : selectAdd(data);
  };

  // 都未选中
  const isNoneSelected = useCreation(
    () => lists.every(item => !selectedSet.has(item)),
    [lists, selectedSet]
  );

  // 是否全选
  const isAllSelected = useCreation(
    () => lists.every(item => selectedSet.has(item)),
    [lists, selectedSet]
  );

  // 是否半选
  const isPartiallySelected = useCreation(
    () => !isNoneSelected && !isAllSelected,
    [isNoneSelected, isAllSelected]
  );

  // 全选
  const selectAll = () => {
    lists.map(item => selectedSet.add(item));
    setSelected(Array.from(selectedSet));
  };

  // 去除全选
  const unSelectAll = () => {
    lists.map(item => selectedSet.delete(item));
    setSelected(Array.from(selectedSet));
  };

  // 全选和不全选切换
  const toggleAll = () => (isAllSelected ? unSelectAll() : selectAll());

  return {
    selected, // 已选元素组
    isSelected, // 是否被选中
    isAllSelected,
    isPartiallySelected,
    isNoneSelected,
    selectAdd,
    selectDel,
    setSelect,
    toggle,
    selectAll,
    unSelectAll,
    toggleAll
  } as const;
};
