import { ChangeEvent } from 'react';

export interface TextAreaProps {
  value?: string;
  placeholder: string;
  className?: string;
  onChange?: (text: string) => void;
}

export interface FormTextAreaProps
  extends Omit<TextAreaProps, 'value' | 'onChange'> {
  name: string;
  onChange: (event: ChangeEvent) => void;
}
