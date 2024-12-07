import { NeverAny } from '@/types';

export interface IConfigWayProps {
  onFinish?: (value: NeverAny) => void;
  onReset?: () => void;
  onFinishFailed?: (values: NeverAny) => void;
}

export type NameProps = number | string;

export interface IDataProps {
  [key: string]: NeverAny;
}

export interface IUpdateAction {
  type: 'updateValue';
  name: NameProps;
  value: NeverAny;
}

export interface IValidateAction {
  type: 'validateField';
  name: NameProps;
}

export type ReducerAction = IUpdateAction | IValidateAction;

export interface IFormInstance {
  registerField: (name: NameProps, updateChange: IUpdateProps) => void; // 注册表单方法
  unRegisterField: (name: NameProps) => void; // 卸载表单方法
  getFieldValue: (name?: NameProps) => NeverAny; // 获取对应的值
  dispatch: (action: ReducerAction) => void; // 方法派发
  setConfigWays: (cb: IConfigWayProps) => void; // 设置方法
  submit: (cb?: NeverAny) => void; // 表单提交
  resetFields: (cb?: () => void) => void; // 重置表单
  getFieldValidate: (name: NameProps) => NeverAny; // 获取表单的验证项
}

export interface IValidateRuleProps {
  required?: boolean;
  message?: string;
  rule?: RegExp | ((value: NeverAny) => boolean);
}

export interface IUpdateProps {
  message?: string;
  required?: boolean;
  updateValue: NeverAny;
  rules?: IValidateRuleProps[];
}

export interface IUpdateChangeProps {
  [key: string]: IUpdateProps;
}

export interface IRulesProps {
  rule?: RegExp | ((val: NeverAny) => boolean);
  message?: string;
}

export type IValidateStatusProps = 'res' | 'pen' | 'rej';

export interface IValidateRuleListProps {
  required: boolean;
  requiredMessage?: string;
  message: string;
  status: IValidateStatusProps;
  rules: IRulesProps[];
}

export interface IValidateRule {
  [key: string]: IValidateRuleListProps | null;
}
