import { ReactNode } from 'react';

export interface TextFieldProps {
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  maxLength?: number;
  addStyles?: object;
  addWrapperStyles?: object;
}

export interface SelectTextFieldProps
  extends Omit<TextFieldProps, 'maxLength'> {
  subText?: string;
  value: string;
  hasDownArrow?: boolean;
  dropDownComponent?: ReactNode;
  onClick?: () => void;
}
