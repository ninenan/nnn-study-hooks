import { forwardRef, useImperativeHandle, ReactNode } from 'react';
import { NOOP } from '@/helpers';
import useForm from '@/hooks/useForm';
import { IDataProps, IFormInstance } from '@/hooks/useForm/types';
import { TNoop, NeverAny } from '@/types';
import FormContext from '@/hooks/useForm/FormContext';

export interface IProps {
  onReset?: TNoop;
  onFinish?: TNoop;
  onFinishFailed?: TNoop;
  initialValues?: IDataProps;
  form?: IFormInstance;
  children: ReactNode;
  [k: string]: NeverAny;
}

const Form = (props: IProps, ref: NeverAny) => {
  const {
    form,
    children,
    onFinish = (data: NeverAny) => {
      // NOOP
    },
    onReset = NOOP,
    onFinishFailed = (error: NeverAny) => {
      // NOOP
    },
    initialValues = {},
    ...rest
  } = props;

  const [formRef] = useForm(initialValues, form);

  const {
    registerField,
    unRegisterField,
    dispatch,
    setConfigWays,
    ...formRefInstance
  } = formRef;

  // Form 可以通过使用 ref 操作实例
  useImperativeHandle(ref, () => formRefInstance, []);

  formRef.setConfigWays({
    onFinish,
    onReset,
    onFinishFailed
  });

  return (
    <form
      {...rest}
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        formRef.submit();
      }}
      onReset={e => {
        e.preventDefault();
        e.stopPropagation();
        formRef.resetFields(); // 重置表单
      }}
    >
      <FormContext.Provider value={formRef}>{children}</FormContext.Provider>
    </form>
  );
};

export default forwardRef(Form);
