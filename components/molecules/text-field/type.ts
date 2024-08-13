import { ReactNode } from 'react';

export interface TextFieldProps {
  inputType?: string;
  label?: string;
  isRequired?: boolean;
  value?: string;
  subText?: string;
  placeholder?: string;
  unit?: string;
  maxLength?: number;
  registerName?: string;
  className?: string;
  wrapperClassName?: string;
  absoluteClassName?: string;
  subTextClassName?: string;
  onChange?: (text: string) => void;
}

export interface SelectTextFieldProps
  extends Omit<
    TextFieldProps,
    'onChange' | 'inputType' | 'value' | 'unit' | 'maxLength' | 'registerName'
  > {
  fieldName?: string;
  onClick?: () => void;
}

export interface TextFieldWrapperProps
  extends Pick<TextFieldProps, 'label' | 'isRequired'> {
  changeLabelColor?: boolean;
  className?: string;
  children: ReactNode;
}
