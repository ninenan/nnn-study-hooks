import { neverAny } from '@/types';

export interface IConfigWayProps {
  onFinish?: (value: neverAny) => void;
  onReset?: () => void;
  onFinishFailed?: (values: neverAny) => void;
}

export type NameProps = number | string;

export interface IDataProps {
  [key: string]: neverAny;
}

export interface IUpdateAction {
  type: 'updateValue';
  name: NameProps;
  value: neverAny;
}

export interface IValidateAction {
  type: 'validateValue';
  name: NameProps;
}

export type ReducerAction = IUpdateAction | IValidateAction;

export interface FormInstance {
  registerField: (name: NameProps, updateChange: IDataProps) => void;
  unRegisterField: (name: NameProps) => void;
  getFieldValue: (name: NameProps) => neverAny;
  dispatch: (action: ReducerAction) => void;
  setConfigWays: (cb: IConfigWayProps) => void;
  submit: (cb?: neverAny) => void;
  resetFields: (cb?: () => void) => void;
  getFieldValidate: (name: NameProps) => neverAny;
}

export interface IValidateRulePorps {
  required?: boolean;
  message?: string;
  rule?: RegExp | ((value: neverAny) => boolean);
}

export interface IUpdateProps {
  message?: string;
  required?: boolean;
  updateValue: neverAny;
  rules?: IValidateRulePorps[];
}

export interface IUpdateChangeProps {
  [key: string]: IUpdateProps;
}

export interface IRulesPorps {
  rule?: RegExp | ((val: neverAny) => boolean);
  message?: string;
}

export type IValidateStatusProps = 'res' | 'pen' | 'rej';

export interface IValidateRuleListProps {
  required: boolean;
  requiredMessage?: string;
  message: string;
  status: IValidateStatusProps;
  rules: IRulesPorps[];
}

export interface IValidateRule {
  [key: string]: IValidateRuleListProps[];
}
