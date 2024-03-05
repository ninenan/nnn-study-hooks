import { NeverAny } from '@/types';
import FormInit from './Form';
import FormItem from './FormItem';

const Form: NeverAny = FormInit;
Form.Item = FormItem;

export default Form;
