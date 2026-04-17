import type { ComponentProps, FC, ReactNode } from 'react';
import { Field } from './Field';
import { Label } from './Label';
import { Input } from './Input';
import { InputError } from './InputError';
import { Submit } from './Submit';
import { cn } from '../../utils/cn';

type FormProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<'form'>;

type FormComponent = FC<FormProps> & {
  Field: typeof Field;
  Label: typeof Label;
  Input: typeof Input;
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

Form.Field = Field;
Form.Label = Label;
Form.Input = Input;
Form.InputError = InputError;
Form.Submit = Submit;

export { Form };
