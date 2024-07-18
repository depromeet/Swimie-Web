export interface TextFieldProps {
  label?: string;
  isRequired?: boolean;
  subText?: string;
  placeholder?: string;
  maxLength?: number;
  addWrapperStyles?: object;
  addStyles?: object;
}

export interface SelectTextFieldProps
  extends Omit<TextFieldProps, 'maxLength'> {
  value: string;
  hasDownArrow?: boolean;
  onClick?: () => void;
}

export interface InputTextFieldProps extends TextFieldProps {
  onChange?: (text: string) => void;
}
