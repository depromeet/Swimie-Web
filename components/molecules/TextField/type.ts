import { ReactNode } from 'react';

export interface TextFieldProps {
  variant?: 'text' | 'select';
  value?: string;
  label?: string;
  isRequired?: boolean;
  inputType?: string;
  unit?: string;
  subText?: string;
  hasDownArrow?: boolean;
  placeholder?: string;
  maxLength?: number;
  addWrapperStyles?: object;
  addTextStyles?: object;
  addStyles?: object;
  onClick?: () => void;
  onChange?: (text: string) => void;
}

export interface TextFieldWrapperProps
  extends Pick<TextFieldProps, 'label' | 'isRequired'> {
  changeLabelColor?: boolean;
  addStyles?: object;
  children: ReactNode;
}
