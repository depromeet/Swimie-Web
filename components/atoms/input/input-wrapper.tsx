import { ReactNode } from 'react';

import { InputProps } from '@/components/atoms';
import { css } from '@/styled-system/css';

interface InputWrapperProps extends Pick<InputProps, 'isRequired'> {
  label: string;
  wrapperStyles?: object;
  children: ReactNode;
}

export function InputWrapper({
  isRequired,
  label,
  wrapperStyles,
  children,
}: InputWrapperProps) {
  return (
    <section className={css(wrapperStyles)}>
      <span>{label}</span>
      {isRequired && <span>*</span>}
      {children}
    </section>
  );
}
