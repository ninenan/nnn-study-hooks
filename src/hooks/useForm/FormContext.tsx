import { createContext } from 'react';
import { IFormInstance } from './types';
import { NOOP } from '../../helpers';

const FormContext = createContext<IFormInstance>({
  registerField: NOOP,
  unRegisterField: NOOP,
  resetFields: NOOP,
  getFieldValue: NOOP,
  dispatch: NOOP,
  setConfigWays: NOOP,
  submit: NOOP,
  getFieldValidate: NOOP
});

export default FormContext;
