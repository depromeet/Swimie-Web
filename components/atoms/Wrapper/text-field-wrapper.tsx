import { ReactNode } from 'react';

import { css } from '@/styled-system/css';

import { TextFieldProps } from './type';

interface TextFieldWrapperProps extends Pick<TextFieldProps, 'isRequired'> {
  label: string;
  addWrapperStyles?: object;
  children: ReactNode;
}

export function TextFieldWrapper({
  isRequired,
  label,
  addWrapperStyles,
  children,
}: TextFieldWrapperProps) {
  return (
    <section className={css(addWrapperStyles)}>
      <span>{label}</span>
      {isRequired && <span className={css({ color: 'red' })}> *</span>}
      {children}
    </section>
  );
}
