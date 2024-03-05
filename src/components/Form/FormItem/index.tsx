import useCreation from '@/hooks/useCreation';
import FormContext from '@/hooks/useForm/FormContext';
import type { IUpdateProps, IValidateRulePorps } from '@/hooks/useForm/types';
import useUpdate from '@/hooks/useUpdate';
import { NeverAny } from '@/types';
import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useEffect
} from 'react';
import Layout from './Layout';

export { default as Layout } from './Layout';

export interface IFormItemProps {
  label?: string;
  toolitip?: string;
  name: string;
  message?: string;
  required?: boolean;
  rules?: IValidateRulePorps[];
  children?: ReactNode;
  [k: string]: NeverAny;
}

const FormItem = (props: IFormItemProps) => {
  const { children, name } = props;
  const update = useUpdate();
  const contextValue = useContext(FormContext);
  const {
    dispatch,
    registerField,
    unRegisterField,
    getFieldValidate,
    getFieldValue
  } = contextValue;

  const updateChange: IUpdateProps = useCreation(() => {
    return {
      message: props.message || `请填写${props?.label}字段`,
      required: props.required,
      rules: props.rules,
      updateValue: () => update()
    };
  }, []);

  useEffect(() => {
    name && registerField(name, updateChange);

    return () => {
      name && unRegisterField(name);
    };
  }, [updateChange]);

  let childrenPro: NeverAny = null;

  if (isValidElement(children) && name) {
    childrenPro = cloneElement(children as ReactElement, {
      value: getFieldValue(name),
      onChange: (v: NeverAny) => {
        const payload: NeverAny = {};
        const value = v?.target?.localName === 'input' ? v?.target?.value : v;
        payload[name] = value;

        dispatch({
          type: 'updateValue',
          name,
          value
        });

        dispatch({
          type: 'validateField',
          name
        });
      },
      status: getFieldValidate(name)?.status === 'rej' ? 'error' : undefined
    });
  } else {
    childrenPro = children;
  }

  return (
    <Layout {...props} {...getFieldValidate(name)}>
      {childrenPro}
    </Layout>
  );
};

export default FormItem;
