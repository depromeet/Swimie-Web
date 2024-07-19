export interface TextFieldProps {
  variant?: 'text' | 'select';
  value?: string;
  label?: string;
  isRequired?: boolean;
  inputType?: string;
  unit?: string;
  subText?: string;
  placeholder?: string;
  maxLength?: number;
  addWrapperStyles?: object;
  addTextStyles?: object;
  addStyles?: object;
  onClick?: () => void;
  onChange?: (text: string) => void;
}
