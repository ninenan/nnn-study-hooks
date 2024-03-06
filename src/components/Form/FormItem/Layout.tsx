import { IValidateStatusProps } from '@/hooks/useForm/types';
import { FC, ReactNode } from 'react';

export interface IProps {
  label: string;
  required: boolean;
  status: IValidateStatusProps;
  message: string;
  toolitp: string;
  children: ReactNode;
}

const Layout: FC<Partial<IProps>> = ({
  label,
  required,
  status,
  message,
  toolitp,
  children
}) => {
  return (
    <div>
      <div>
        {required && <span style={{ color: 'red', marginRight: 3 }}>*</span>}
        {label || ''}
        {toolitp && <span>{toolitp}</span>}
      </div>
      <div>{children}</div>
      {status === 'rej' && (
        <div
          style={{
            color: 'red',
            fontSize: '12px',
            lineHeight: '22px',
            padding: '0 6px'
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Layout;
