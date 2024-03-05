import { NeverAny, TFn, TNoop } from '@/types';
import {
  IFormInstance,
  IConfigWayProps,
  IDataProps,
  IUpdateChangeProps,
  IValidateRule,
  NameProps,
  IValidateStatusProps,
  ReducerAction,
  IUpdateProps,
  IValidateRuleListProps
} from './types';

export default class FormStore {
  store: IDataProps = {}; // 管理表单整体数据
  update_store: IUpdateChangeProps = {}; // 保存更新的对象
  initialValues: IDataProps = {}; // 保存初始值
  configWay: IConfigWayProps = {}; // 对应的方法集合
  validateRule: IValidateRule = {}; // 校验表单的规则
  validateQueue: NeverAny[] = []; // 校验队列

  constructor(initialValues: IDataProps) {
    this.store = initialValues;
    this.initialValues = initialValues;
  }

  // 暴露对应的方法
  getDetail = (): IFormInstance => ({
    registerField: this.registerField,
    unRegisterField: this.unRegisterField,
    getFieldValue: this.getFieldValue,
    dispatch: this.dispatch,
    setConfigWays: this.setConfigWays,
    submit: this.submit,
    resetFields: this.resetFields,
    getFieldValidate: this.getFieldValidate
  });

  // 注册表单方法
  registerField = (name: NameProps, updateChange: IUpdateProps) => {
    this.update_store[name] = updateChange;
    this.validateRule[name] = this.createValidate(name, updateChange);
  };
  // 创建验证模块
  createValidate = (
    name: NameProps,
    updateChange: IUpdateProps
  ): null | IValidateRuleListProps => {
    const { rules = [], required = false, message = '' } = updateChange;
    if (rules.length === 0 && !required) {
      return null;
    }
    // 抽出必填项
    const requiredFlage = required || rules.find(v => v.required)?.required;
    // 如果存在必填项则更新对应表单
    if (requiredFlage) {
      this.updateStoreField(name);
    }

    return {
      message,
      requiredMessage: message,
      required: requiredFlage || false,
      status: 'pen', // 设置为等待（初始）状态
      rules: rules.filter(v => v?.rule) // 过滤掉有 required 的项
    };
  };

  // 卸载表单方法
  unRegisterField = (name: NameProps) => {
    delete this.update_store[name];
    delete this.validateRule[name];
  };

  // 获取对应的值
  getFieldValue = (name?: NameProps) => {
    if (name) {
      return this.store[name];
    }
    return this.store;
  };

  // 获取表单的验证值
  getFieldValidate = (name: NameProps) => {
    return this.validateRule[name];
  };

  // 方法派发
  dispatch = (action: ReducerAction) => {
    switch (action.type) {
      case 'updateValue':
        this.updateValue(action.name, action.value);
        break;
      case 'validateField':
        this.validateFieldValue(action.name);
        break;
      default:
        break;
    }
  };

  // 更新
  updateValue = (name: NameProps, value: NeverAny) => {
    this.store = {
      ...this.store,
      [name]: value
    };
  };

  // 设置方法
  setConfigWays = (configWays: IConfigWayProps) => {
    this.configWay = configWays;
  };

  // 更新对应的表单
  updateStoreField = (name: NameProps) => {
    const update = this.update_store[name];
    if (update) {
      update?.updateValue();
    }
  };

  // 错误收集
  errorValidateFields = () => {
    let errorList: NeverAny[] = [];

    Object.keys(this.validateRule).forEach(name => {
      const data = this.validateRule[name];
      if (data && data.status === 'rej') {
        errorList = [...errorList, { name, errors: data.message }];
      }
    });
  };

  // 集中表单验证
  validateField = () => {
    let flag = true;
    Object.keys(this.validateRule).forEach(name => {
      const status = this.validateFieldValue(name);
      if (status && status === 'rej') {
        flag = false;
      }
    });

    return flag;
  };

  // 单个表单验证
  validateFieldValue = (name: NameProps): IValidateStatusProps | null => {
    const data = this.validateRule[name];
    if (!data) {
      return null;
    }
    let status: IValidateStatusProps = 'res';
    const value = this.store[name];
    const last_status = data.status;
    const last_message = data.message;

    if (data.required && !value) {
      status = 'rej';
      data.message = data.requiredMessage || '';
    }

    data.rules.map(v => {
      if (status !== 'rej' && value && v.rule) {
        if (v.rule instanceof RegExp && !v.rule.test(value)) {
          status = 'rej';
          data.message = v.message || '';
        }

        if (typeof v.rule === 'function' && !v.rule(value)) {
          status = 'rej';
          data.message = v.message || '';
        }
      }
    });

    if (last_status !== status || last_message !== data.message) {
      const validateUpdate = this.updateStoreField.bind((this, name));
      this.validateQueue.push(validateUpdate);
    }

    this.promiseValidate();

    data.status = status;
    return status;
  };

  // 异步校验队列
  promiseValidate = () => {
    if (this.validateQueue.length === 0) {
      return null;
    }

    Promise.resolve().then(() => {
      while (this.validateQueue.length > 0) {
        const validateUpdate = this.validateQueue.shift();
        validateUpdate?.();
      }
    });
  };

  // 提交
  submit = (cb?: TNoop) => {
    const status = this.validateField();
    const { onFinish, onFinishFailed } = this.configWay;

    if (!status) {
      const errorFields = this.errorValidateFields();
      cb?.({ errorFields, values: this.store });

      onFinishFailed?.({ errorFields, values: this.store });
    } else {
      onFinish?.(this.store);
      cb?.(this.store);
    }
  };

  // 重置表单
  resetFields = (cb?: TFn) => {
    const { onReset } = this.configWay;
    Object.keys(this.store).forEach(name => {
      // 重置表单时候，如果有初始值使用初始值
      this.initialValues[name]
        ? (this.store[name] = this.initialValues[name])
        : delete this.store[name];
      this.updateStoreField(name);
    });

    Object.keys(this.validateRule).forEach(name => {
      const data = this.validateRule[name];
      if (data) {
        if (data.status === 'rej') {
          this.updateStoreField(name);
        }
        data.status = 'pen';
      }
    });
    cb?.();
    onReset?.();
  };
}
