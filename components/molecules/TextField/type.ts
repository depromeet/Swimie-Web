export interface TextFieldProps {
  label?: string;
  isRequired?: boolean;
  subText?: string;
  placeholder?: string;
  maxLength?: number;
  addWrapperStyles?: object;
  addTextStyles?: object;
  addStyles?: object;
}

export interface SelectTextFieldProps
  extends Omit<TextFieldProps, 'maxLength'> {
  value: string;
  hasDownArrow?: boolean;
  onClick?: () => void;
}

export interface InputTextFieldProps extends TextFieldProps {
  unit?: string;
  onChange?: (text: string) => void;
}
