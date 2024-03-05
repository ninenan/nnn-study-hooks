import { useRef } from 'react';
import FormStore from './FormStore';
import { IDataProps, IFormInstance } from './types';

export default (initialValues: IDataProps, formInstance?: IFormInstance) => {
  const formEl = useRef<IFormInstance | null>();

  if (!formEl.current) {
    // 如果存在实例，直接使用
    if (formInstance) {
      formEl.current = formInstance;
    } else {
      // 创建一个实例，获取对应的方法，通过 getDetail 获取暴露的方法集合
      formEl.current = new FormStore(initialValues).getDetail();
    }
  }

  return [formEl.current];
};
