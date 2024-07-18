import { ReactNode } from 'react';

import { TextFieldProps } from '@/components/molecules';

export interface TextFieldWrapperProps
  extends Pick<TextFieldProps, 'label' | 'isRequired'> {
  changeLabelColor?: boolean;
  addStyles?: object;
  children: ReactNode;
}
