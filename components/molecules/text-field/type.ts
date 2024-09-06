import { ReactNode } from 'react';
import { ChangeHandler } from 'react-hook-form';

export interface TextFieldProps {
  inputType?: string;
  label?: string;
  isRequired?: boolean;
  value?: string;
  subText?: string;
  placeholder?: string;
  unit?: string;
  maxLength?: number;
  step?: number;
  preventDecimal?: boolean;
  className?: string;
  wrapperClassName?: string;
  absoluteClassName?: string;
  subTextClassName?: string;
  onChange?: (text: string) => void;
}

export interface FormTextFieldProps
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  registerdFieldValue: string | number;
  onChange: ChangeHandler;
  name: string;
}

export interface SelectTextFieldProps
  extends Omit<
    TextFieldProps,
    'onChange' | 'inputType' | 'value' | 'unit' | 'maxLength' | 'registerName'
  > {
  subFieldText?: string;
  fieldName?: string;
  onClick?: () => void;
}

export interface TextFieldWrapperProps
  extends Pick<TextFieldProps, 'label' | 'isRequired'> {
  changeLabelColor?: boolean;
  className?: string;
  children: ReactNode;
}
