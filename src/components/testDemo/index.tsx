import { FC, SetStateAction, useRef, useState } from 'react';

interface IProps {
  onChange: (e: string) => void;
  value: string;
  defaultValue: string;
}

export type Options<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (v: T) => void;
};

const useUpdate = () => {
  const [, setCount] = useState(0);

  return () => {
    setCount(val => ++val);
  };
};

const usePropsValue = <T,>(options: Options<T>) => {
  const { value, defaultValue, onChange } = options;
  const isControlled = value !== undefined;
  const stateRef = useRef<T | undefined>(isControlled ? value : defaultValue); // 兼容 defaultValue

  const update = useUpdate();

  if (isControlled && value) {
    stateRef.current = value;
  }

  const setState = (v: SetStateAction<T>, forceTrigger = false) => {
    const nextValue =
      typeof v === 'function'
        ? (v as (prevState: T) => T)(stateRef.current!)
        : v;

    if (!forceTrigger && nextValue === stateRef.current) {
      return;
    }

    stateRef.current = nextValue;
    update();
    onChange?.(nextValue);
  };

  return [stateRef.current, setState] as const;
};

const Input: FC<Partial<IProps>> = props => {
  const [value = '', setValue] = usePropsValue<string>(props);

  return (
    <input type="text" value={value} onChange={e => setValue(e.target.value)} />
  );
};

const Index = () => {
  const [value, setValue] = useState('333');

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <div>
      <h2>非受控组件&受控组件</h2>
      <p>非受控组件</p>
      <Input defaultValue="444" />
      <p>受控组件</p>
      <Input value={value} onChange={onChange} />
    </div>
  );
};

export default Index;
