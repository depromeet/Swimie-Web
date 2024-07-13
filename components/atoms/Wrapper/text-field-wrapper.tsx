import { ReactNode } from 'react';

import { css } from '@/styled-system/css';

import { TextFieldProps } from './type';

interface TextFieldWrapperProps extends Pick<TextFieldProps, 'isRequired'> {
  label: string;
  wrapperStyles?: object;
  children: ReactNode;
}

export function TextFieldWrapper({
  isRequired,
  label,
  wrapperStyles,
  children,
}: TextFieldWrapperProps) {
  return (
    <section className={css(wrapperStyles)}>
      <span>{label}</span>
      {isRequired && <span className={css({ color: 'red' })}> *</span>}
      {children}
    </section>
  );
}
