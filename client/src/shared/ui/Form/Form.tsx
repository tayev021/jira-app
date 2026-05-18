import type { ComponentProps, FC, ReactNode } from 'react';
import { Heading } from './Heading';
import { Field } from './Field';
import { Label } from './Label';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { Select } from './Select';
import { Option } from './Option';
import { InputError } from './InputError';
import { Submit } from './Submit';
import { cn } from '../../utils/cn';

type FormProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<'form'>;

type FormComponent = FC<FormProps> & {
  Heading: typeof Heading;
  Field: typeof Field;
  Label: typeof Label;
  Input: typeof Input;
  TextArea: typeof TextArea;
  Select: typeof Select;
  Option: typeof Option;
  InputError: typeof InputError;
  Submit: typeof Submit;
};

const Form: FormComponent = ({ children, className = '', ...props }) => {
  return (
    <form
      className={cn(
        'w-xs h-min p-5 flex flex-col gap-6 border-2 rounded-2xl border-primary leading-none',
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
};

Form.Heading = Heading;
Form.Field = Field;
Form.Label = Label;
Form.Input = Input;
Form.TextArea = TextArea;
Form.Select = Select;
Form.Option = Option;
Form.InputError = InputError;
Form.Submit = Submit;

export { Form };
