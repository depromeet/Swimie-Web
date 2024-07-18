import { ReactNode } from 'react';

export interface TextFieldProps {
  label: string;
  isRequired?: boolean;
  subText?: string;
  placeholder?: string;
  maxLength?: number;
  addStyles?: object;
  addWrapperStyles?: object;
}

export interface SelectTextFieldProps
  extends Omit<TextFieldProps, 'maxLength'> {
  value: string;
  hasDownArrow?: boolean;
  dropDownComponent?: ReactNode;
  onClick?: () => void;
}
